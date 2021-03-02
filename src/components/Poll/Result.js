import React from "react";
import { getAllList, getDishToPointCount } from "../../Util/StorageUtil";
import { Button } from "../comman/Input";

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

const ListItem = ({
  pollName,
  pollDescription,
  imageInfo,
  points = 0,
  index,
}) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-12">
      <div className="card m-3">
        <img
          className="card-img-top img-thumbnail"
          onError={(e) => {
            e.target.src = "https://dummyimage.com/600x400/000/fff&text=Dish";
          }}
          src={imageInfo}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{pollName}</h5>
          <p className="card-text">{pollDescription}</p>
          <Button
            className="btn btn-pill text-white btn-block btn-primary"
            text={`Points ${points}`}
          />
        </div>
      </div>
    </div>
  );
};

function compare(a, b) {
  let comparison = 0;
  if (a.points > b.points) {
    comparison = -1;
  } else if (a.points < b.points) {
    comparison = 1;
  }
  return comparison;
}
