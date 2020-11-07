import React from "react";
import { Trans } from '@lingui/macro';
import InfiniteScroll from "react-infinite-scroll-component";
import HotelCardItem from "./HotelCardItem";

const LoadingData = props => {
  return (
    <div
      className="loader"
      style={{ margin: "20px auto", textAlign: "center" }}
    >
      <h2> <Trans id="loading"> Loading.... </Trans></h2>
    </div>
  );
};

class HotelCardsList extends React.Component {
  render() {
    const {
      hotels,
      hasMoreItems,
      fetchHotels,
      selectLocationmarker,
      unSelectLocationmarker,
      selectHotelDetails
    } = this.props;
    return (
      <div className="loc-filter__right">
        <div className="loc-filter__right-wrap" id="scrollableDiv">
          <div className="hrz-products">
            <div className="container">
              <InfiniteScroll
                dataLength={hotels.length}
                next={fetchHotels}
                hasMore={hasMoreItems}
                loader={<LoadingData />}
                scrollableTarget="scrollableDiv"
              >
                {hotels.map((hotel, i) => (
                  <HotelCardItem
                    selectHotelDetails={() => selectHotelDetails(hotel.id, hotel.originalCode)}
                    key={i}
                    index={i}
                    {...hotel}
                    selectLocationmarker={index => selectLocationmarker(index)}
                    unSelectLocationmarker={index =>
                      unSelectLocationmarker(index)
                    }
                  />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelCardsList;
