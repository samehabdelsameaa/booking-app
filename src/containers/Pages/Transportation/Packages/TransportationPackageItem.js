import React from 'react';
import { Trans } from '@lingui/macro';
//test
const TransportationPackageItem = ({packageInfo: { id, packageClass, roundTrip, VehicleTypes, mazarat, meal}, toggleSelected , isSelectedPackage, index}) => {    
    return (
        <div className={`package-types__block ${isSelectedPackage && 'package-types__block--lg'} package-types__block--${packageClass === 'economy' ? 'light' : packageClass === 'standard' ? 'green' : packageClass === 'ultimate' ? 'blue' : ''}`} id={id}>
            <div className="package-types__head">
                <div className="package-types__title"><Trans id={packageClass}> {packageClass} </Trans></div>
            </div>
            <div className="package-types__body">
                <div className={`package-types__item package-types__item--${roundTrip === true ? 'success' : roundTrip === false ? 'error' : 'default'}`}>
                    <svg width="12" height="12">
                        <use href={roundTrip === true ? '#checked' : roundTrip === false ? '#error-package' : ''}></use>
                    </svg>
                    <span> {roundTrip === true ? <Trans id="included"> Included </Trans> : <Trans id="not_included"> Not Included </Trans> } </span>
                </div>
                <div className={`package-types__item package-types__item--${VehicleTypes.isAvailable === true ? 'success' : VehicleTypes.isAvailable === false ? 'default' : 'default'}`}>
                    <svg width="12" height="12" className="car-icon">
                        <use href="#small-car"></use>
                    </svg>
                    <span> {VehicleTypes.count } <Trans id="vehicle_types"> Vehicle Types </Trans></span>
                </div>
                <div className={`package-types__item package-types__item--${mazarat === true ? 'success' : mazarat === false ? 'error' : 'default'}`}>
                    <svg width="12" height="12">
                        <use href={mazarat === true ? '#checked' : mazarat === false ? '#error-package' : ''}></use>
                    </svg>
                    <span>{mazarat === true ? <Trans id="included"> Included </Trans> : <Trans id="not_included"> Not Included </Trans> }</span>
                </div>
                <div className={`package-types__item package-types__item--${meal === true ? 'success' : meal === false ? 'error' : 'default'}`}>
                    <svg width="12" height="12">
                        <use href={meal === true ? '#checked' : meal === false ? '#error-package' : ''}> </use>
                    </svg>
                    <span>{meal === true ? <Trans id="included"> Included </Trans> : <Trans id="not_included"> Not Included </Trans> }</span>
                </div>
            </div>
            <div className="package-types__foot">
                <button type="button" className={`package-types__btn ${isSelectedPackage && 'active'}`} onClick={() => toggleSelected(index)}>
                    {isSelectedPackage !== true ? <Trans id="select"> Select </Trans> : <Trans id="selected"> Selected </Trans>}  
                </button>
            </div>
        </div>
    )
}

export default TransportationPackageItem;
