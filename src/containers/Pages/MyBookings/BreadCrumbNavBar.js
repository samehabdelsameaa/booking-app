import React, { Component } from 'react';
import { Trans } from '@lingui/macro';
import { urlRoutes } from './Routes';

class BreadCrumbNavBar extends Component {
    render(){
        const { location } = this.props;
        const routeName = urlRoutes && urlRoutes.find( r => r.uri === location.pathname);
        return(
            <div className="pc-breadcrumbs">
                <a href="#" className="pc-breadcrumbs__link"><Trans id="account"> Account </Trans> </a> /
                <span className="pc-breadcrumbs__link active"> {routeName.title} </span>
            </div>
        )
    }
}

export default BreadCrumbNavBar;