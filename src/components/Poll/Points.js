import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  getPollList,
  UpdatePollCount,
  userSelectedDishes,
} from "../../Util/StorageUtil";
import { ListItem } from "../comman/Input";

export class Points extends React.PureComponent {
  selectedDishes = [];
  state = {
    pollList: [],
    showPollPoint: false,
    isRedirect: false,
  };

  componentDidMount() {
    this.props.onClickNext();
    const { user } = this.props;
    const selectedDishes = userSelectedDishes(user);
    this.selectedDishes = selectedDishes;
    const pollList = getPollList(user.id);
    this.setState({ pollList });
  }

  onSelectPoll = (index) => {
    if (this.selectedDishes.includes(index)) {
      this.selectedDishes = this.selectedDishes.filter((e) => e !== index);
    } else {
      this.selectedDishes.push(index);
    }
    if (this.selectedDishes.length === 3) {
      this.setState({ showPollPoint: true });
      return;
    }
    this.forceUpdate();
  };

  onPollingClick = () => {
    this.setState({ showPollPoint: true });
  };

  getPollPointList = () => {
    const { pollList } = this.state;
    return pollList.filter((e) => this.selectedDishes.includes(e.index));
  };

  onSubmit = (selectedDishes) => {
    const { user } = this.props;
    this.selectedDishes = selectedDishes;
    this.selectedDishes.length = 3;
    UpdatePollCount(user, selectedDishes);
    this.props.onClickNext();
    this.setState({ showPollPoint: false, isRedirect: true });
  };

  onClose = () => {
    this.setState({ showPollPoint: null });
  };

  render() {
    const { showPollPoint, pollList, isRedirect } = this.state;
    return (
      <div className="row">
        {isRedirect ? <Redirect to="/result" /> : null}
        <div className="col-12">
          <button
            onClick={this.onPollingClick}
            disabled={!this.selectedDishes.length}
            className="btn btn-sm btn-info m-2 float-right"
          >
            Polling
          </button>
          <Link
            to={"/result"}
            className="btn btn-sm btn-primary m-2 float-right"
          >
            Next
          </Link>
        </div>
        {pollList.map((e, i) => (
          <ListItem
            {...e}
            selectedDishes={this.selectedDishes}
            onSelectPoll={this.onSelectPoll}
            key={`poll${i}`}
          />
        ))}
        {!!showPollPoint ? (
          <AddPoints
            onClose={this.onClose}
            selectedDishes={this.getPollPointList()}
            onPointClick={this.onPointClick}
            onSubmit={this.onSubmit}
          />
        ) : null}
      </div>
    );
  }
}

const AddPoints = ({ selectedDishes = [], onSubmit, onClose }) => {
  const [dishes, setDishes] = useState(selectedDishes);
  const onPointClick = (index, point) => {
    const findPoint = dishes.find((e) => e.points === point);
    if (findPoint) {
      findPoint.points = 0;
    }
    const findItem = dishes.find((e) => e.index === index);
    findItem.points = point;
    setDishes([...dishes]);
  };
  return (
    <div className="modal fade show" style={{ display: "unset" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add/Edit Dish
            </h5>
            <button onClick={onClose} type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              {dishes.map((e, i) => (
                <ListItem
                  {...e}
                  onPointClick={onPointClick}
                  isFull={true}
                  key={`key${i}`}
                />
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onSubmit(dishes)}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
