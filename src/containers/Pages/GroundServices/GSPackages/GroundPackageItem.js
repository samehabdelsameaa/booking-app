import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';

const GroundPackageItem = ({servicePackageInfo : { type, description: serviceItems }, index, setSelectedPackage, isSelectedPackage}) => {  
    const packagetype = type.toLowerCase();  
    const packageBrandColor  = packagetype === 'basic' ? 'light' : packagetype === 'premium' ? 'green' : packagetype === 'vip' ? 'blue' : 'default';

    return (
        <div className={`package-types__block package-types__block--${packageBrandColor} ${isSelectedPackage ? 'package-types__block--lg' : ''}`}>
            <div className="package-types__head">
                <div className="package-types__title"><Trans id={type}> {type} </Trans>  </div>
            </div>
            <div className="package-types__body">
                {
                    serviceItems && serviceItems.map( ({item, status, delayedPeriod, rejectedReason}, i) => (
                        <div className={`package-types__item package-types__item--${ status === true || status === 'delayed'  ? "success" : status === 'rejected' ? 'default' : "error" }`} key={i}>
                            <span className="_ms-hide package-types__desc"> { item.label } </span>
                            <span className="package-types__desc-info">
                                <svg width="12" height="12">
                                    <use href={`#${ status === true ? 'checked' : status === 'rejected' ? 'checked' : status === 'delayed' ? 'wall-clock' : 'error-package' }`}></use>
                                </svg>
                                <span>
                                    { status === true ? <Trans id="included"> Included </Trans> 
                                    : status === 'rejected' ? <Trans id={rejectedReason}> {rejectedReason} </Trans> 
                                    : status === 'delayed' ? <Trans id={delayedPeriod}> {delayedPeriod} </Trans> : <Trans id="no_included"> Not Included </Trans> } 
                                </span>
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className="package-types__foot">
                <button type="button" className={`package-types__btn ${isSelectedPackage ? 'active': null}`} onClick={() => setSelectedPackage(index)}> 
                    { isSelectedPackage ? <Trans id="selected"> Selected </Trans> : <Trans id="select"> Select </Trans>}
                </button>
            </div>
        </div>
    )
}

GroundPackageItem.propTypes = {
    servicePackageInfo: PropTypes.shape({
        type: PropTypes.string,
        description: PropTypes.arrayOf(PropTypes.object)
    }),
    index: PropTypes.number,
    setSelectedPackage: PropTypes.func,
    isSelectedPackage: PropTypes.bool
}

export default GroundPackageItem;