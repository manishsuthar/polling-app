import React from "react";
import { getAllList, getDishToPointCount } from "../../Util/StorageUtil";
import { Button, ListItem } from "../comman/Input";

export class Result extends React.PureComponent {
  state = {
    pollList: [],
  };

  componentDidMount() {
    this.props.onClickNext();
    const userData = getDishToPointCount();
    const allDishes = getAllList();
    allDishes.forEach((dishes) => {
      dishes.points = userData[dishes.index] || 0;
    });
    allDishes.sort(compare);
    this.setState({ pollList: allDishes });
  }

  render() {
    const { pollList } = this.state;
    return (
      <div className="col-12">
        <div className="row">
          {pollList.map((e, i) => (
            <ListItem {...e} onEdit={this.onEdit} key={`key${i}`} />
          ))}
        </div>
      </div>
    );
  }
}

function compare(a, b) {
  let comparison = 0;
  if (a.points > b.points) {
    comparison = -1;
  } else if (a.points < b.points) {
    comparison = 1;
  }
  return comparison;
}
