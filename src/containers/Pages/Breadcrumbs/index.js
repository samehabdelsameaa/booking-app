import React from "react";
import Breadcrumb from "components/Breadcrumb";
import { PropTypes } from "prop-types";

const divStyle = {
  "text-align": "center"
};
class Breadcrumbs extends React.Component {
  state = { breadcrumbs: undefined, currentActive: undefined };

  componentDidMount() {
    if (this.props.breadcrumbs && this.props.breadcrumbs.length > 0) {
      this.setState({
        breadcrumbs: this.props.breadcrumbs.sort((a, b) =>
          a.order > b.order ? 1 : -1
        )
      });
    }
  }
  setActive(name) {
    let index = this.state.breadcrumbs.findIndex(item => {
      return item.name === name;
    });

    let items = this.state.breadcrumbs;
    if (items[index] && items[index]["navigatable"]) {
      items.forEach(e => {
        e.active = false;
      });
      items[index]["active"] = true;

      this.setState({ breadcrumbs: items, currentActive: items[index] });
    }
    //todo-- route to selected component--//
  }
  render() {
    return (
      <div style={divStyle}>
        <ul className="breadcrumb">
          {this.state.breadcrumbs &&
            this.state.breadcrumbs.map(item => (
              <Breadcrumb
                key={item.name}
                title={item.title}
                name={item.name}
                icon={item.icon}
                active={item.active}
                onclick={() => {
                  if (item.navigatable) this.setActive(item.name);
                  alert(`${item.title} has been clicked - ${item.navigatable}`);
                }}
              />
            ))}
        </ul>
        <br />
        Currently Active :{" "}
        {this.state.currentActive
          ? this.state.currentActive.title
          : "None is active"}
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Breadcrumbs;
