import React, { Component } from 'react';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { urlRoutes } from './Routes';

class BookingSideNav extends Component {
    render() {
        const { location } = this.props;
        
        return (
            <div className="pc-aside">
                <div className="pc-aside__wrap">
                    <div className="pc-aside__title"><Trans id="account_details"> Account details </Trans></div>
                    <div className="pc-aside__list">
                        {
                            urlRoutes && urlRoutes.map( ({title, uri}, index) => (
                                <Link to={uri} className="pc-aside__link" key={index}> 
                                    <span className={`pc-aside__link ${uri === location.pathname ? 'active' : ''}`} style={{margin:0}}> 
                                        <Trans id={title.toLowerCase().replace(' ', '_')}> {title} </Trans> 
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingSideNav;