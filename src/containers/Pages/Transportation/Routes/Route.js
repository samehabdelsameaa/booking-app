import React from 'react';
import { Trans } from '@lingui/macro';

const RoutesPoints = ({ pointNInfo: { icon, city }, isLastPoint }) => {
    return (
        <div className={`route__point ${isLastPoint && "route__point--last"}`}>
            <div className={`route__view ${isLastPoint && "route__view--rotate"}`}>
                <svg width="30" height="30">
                    <use href={`#${icon}`}></use>
                </svg>
            </div>
            <div className="route__title"> <Trans id={city}> {city} </Trans> </div>
            <div className="route__marker">
                <svg width="35" height="35">
                    <use href="#empty-marker"></use>
                </svg>
            </div>
        </div>
    )
}

const Route = ({ routes: { routeImage, routePoints }, index, toggleRoute, isSelectedRoute }) => {
    return (
        <div className="route__item" style={{ border: isSelectedRoute ? '2px solid #01bab4' : '2px solid transparent' }}>
            <div className="route__content">
                <div className="route__img">
                    <img src={routeImage} alt="" className="route__img-item" />
                </div>
                <div className="route__info">
                    {
                        routePoints && routePoints.map(({ id, ...PointInfo }, index) => {
                            const lastPoint = (routePoints.length - 1) === index;
                            return <RoutesPoints key={id} pointNInfo={PointInfo} isLastPoint={lastPoint} />
                        })
                    }
                </div>
            </div>
            <div className="route__btn">
                <button className={isSelectedRoute ? "button active" : "button"} onClick={() => toggleRoute(index)}>
                    {isSelectedRoute ? <Trans id="selected"> Selected </Trans> : <Trans id="select"> Select </Trans>}  
                </button>
            </div>
        </div>
    )
}

export default Route;