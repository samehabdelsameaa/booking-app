import React, { Component } from 'react';
import styled from 'styled-components';

const LabelStyle = styled.div`
    span{
        margin-top: 12px;
        margin-left: -10px;
        &:before {
            display:none;
        }
    }
`;

class ServiceItem extends Component {
    toggleInputCHeck = serviceCode => {
        this.props.setServiceSelected(serviceCode);
    }

    render() {
        const { 
            service: { name, code }, 
            selectedAdditionalServices,
        } = this.props;
        
        return (
            <div className="t-service__item">
                <div className="t-service__left">
                    <label className="form-check" >
                        <input type="checkbox" name="preferences-check" 
                            checked={selectedAdditionalServices && selectedAdditionalServices.includes(code)} 
                            onChange={() => this.toggleInputCHeck(code)} 
                            value={code} 
                        />
                        <span></span>
                    </label>
                    <LabelStyle>
                        <span className="t-service__name">
                            {name}
                        </span>
                    </LabelStyle>
                </div>
            </div>
        )
    }
}

export default ServiceItem;