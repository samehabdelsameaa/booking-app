import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import format from 'date-fns/format';

const TimeOutCounter = styled.div`
    .refresh-icon{
        cursor:pointer;
        display:inline-block;
    }
`;

const ModalComponent = styled(Modal)`
    .modal-header{
        padding-bottom:0;
        background: #01bab4;
        color:#fff
    }
    .modal-footer{
        button{
            background: #01bab4;
            color: #fff
            &:hover{
                background: rgba(1,186,180,0.7);
            }
        }
    }
`;

const TimeOutSession = (props) => {
  const [timeOut, setTimeOut] = useState(600);
  const [timeToNotify, setNotificationTime] = useState(180);
  const [sessionTime, setSessionTime] = useState('');

  useEffect(() => {
    setTimeOut(props.timeOutInSeconds)
    setNotificationTime(props.timeToNotify)
  }, [props.timeOutInSeconds, props.timeToNotify])

  useEffect(() => {
    let interval;
    if (timeOut >= 0) {
      interval = setInterval(() => updateCounter(), 1000);
    }
    return () => {
      clearInterval(interval);
    }
  })

  const updateCounter = () => {
    const currentTime = format(new Date(timeOut * 1000), 'mm:ss');
    if (timeOut >= 0) {
      setTimeOut(timeOut - 1);
      setSessionTime(currentTime)
    }
  }

  const extendSession = () => {
    setTimeOut(props.timeOutInSeconds);
    setSessionTime('')
  }
  
  const renderNotificationMessage = () => {
    return (timeOut < timeToNotify && timeOut > 0) ? true : (timeOut <= 0) ? false : null;
  }


  return (
    <React.Fragment>
      <TimeOutCounter>
        <span> Time Out in: <strong> {sessionTime} </strong> </span>
        <FontAwesomeIcon icon={faSyncAlt} onClick={extendSession} className="refresh-icon" />
      </TimeOutCounter>

      {renderNotificationMessage() &&
        <UserTimeOutNotification
          sessionTime={sessionTime}
          refresh
          msg="Your session will be out in: "
          headerTitle="Session is about to time out!"
          buttonText="click here to extend your session"
          refreshSessionTime={extendSession}
        />
      }
      {renderNotificationMessage() === false ?
        <UserTimeOutNotification
          msg="Your session has been expired. Please click below to start over"
          headerTitle="Session Time Out"
          buttonText="Start Over"
          refreshSessionTime={extendSession}
          redirectUrl={props.RedirectUrlOnExpiry}
        />
        : null
      }
    </React.Fragment>
  );
}

TimeOutSession.defaultProps = {
  RedirectUrlOnExpiry: window.location.origin,
}

TimeOutSession.propTypes = {
  timeOutInSeconds: PropTypes.number,
  timeToNotify: PropTypes.number,
  RedirectUrlOnExpiry: PropTypes.string,
}

const UserTimeOutNotification = (props) => {
  const { sessionTime, msg, headerTitle, buttonText, refresh, refreshSessionTime, redirectUrl } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    handleShow()
    if (sessionTime <= 0) {
      handleClose();
    }
  }, [sessionTime])

  const redirect = () => window.location.href = redirectUrl;

  return (
    <ModalComponent show={show} backdrop="static" onHide={handleClose} size="lg">
      <Modal.Header > <p> {headerTitle} </p> </Modal.Header>
      <Modal.Body> {msg} <strong> {sessionTime ? sessionTime : null} </strong> </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={refresh ? refreshSessionTime : redirect}> {buttonText} </Button>
      </Modal.Footer>
    </ModalComponent>
  )
}

export default TimeOutSession;