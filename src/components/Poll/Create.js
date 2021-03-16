import React, { useState } from "react";
import {
  getCountIndex,
  getUserData,
  saveUserData,
} from "../../Util/StorageUtil";
import { ImageSelector } from "../comman/ImageSelector";
import { Button, Input, ListItem } from "../comman/Input";

export class Create extends React.PureComponent {
  items = [];
  state = {
    userData: [],
    isAddEdit: null,
  };

  componentDidMount() {
    this.props.onClickNext();
    const { user } = this.props;
    const userData = getUserData(user.id);
    this.setState({ userData });
  }

  onClickAdd = () => {
    const index = getCountIndex();
    this.setState({ isAddEdit: { index: index } });
  };

  onEdit = (index) => {
    const { userData } = this.state;
    const data = userData.find((e) => e.index === index);
    this.setState({ isAddEdit: data });
  };

  onClose = () => {
    this.setState({ isAddEdit: null });
  };

  onSubmit = (data) => {
    const { userData } = this.state;
    const { user } = this.props;
    const updatedData = [...userData];
    const index = updatedData.findIndex((e) => e.index === data.index);

    if (index != -1) {
      updatedData[index] = data;
    } else {
      updatedData.push(data);
    }
    this.setState({ userData: updatedData, isAddEdit: null });
    saveUserData(updatedData, user.id);
  };

  render() {
    const { userData, isAddEdit } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <button
            onClick={this.onClickAdd}
            className="btn btn-sm btn-primary m-2 float-right"
          >
            Add
          </button>
        </div>
        {!!isAddEdit ? (
          <AddEditDishes
            {...isAddEdit}
            onClose={this.onClose}
            onSubmit={this.onSubmit}
          />
        ) : null}
        {userData.map((e, i) => (
          <ListItem {...e} onEdit={this.onEdit} key={`key${i}`} />
        ))}
        {!userData.length ? (
          <div className="align-self-center m-auto">
            <h3>No dishes Found !</h3>
            <p>Add Some Dishes</p>
          </div>
        ) : null}
      </div>
    );
  }
}

const AddEditDishes = ({
  pollName,
  pollDescription,
  imageInfo,
  onClose,
  onSubmit,
  index,
}) => {
  const [_pollName, setPollName] = useState(pollName);
  const [_pollDescription, setPollDescription] = useState(pollDescription);
  const [_imageInfo, setImageInfo] = useState(imageInfo);
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
            <form>
              <Input
                type={"text"}
                label="Dish Name"
                placeholder="Dish name"
                onChange={setPollName}
                name="pollName"
                value={_pollName}
              />
              <textarea
                value={_pollDescription}
                className="form-control"
                onChange={(e) => setPollDescription(e.target.value, e)}
                name="pollDescription"
                rows="4"
                placeholder="Description"
              />
              <ImageSelector
                imageInfo={_imageInfo}
                onImageSelect={setImageInfo}
              />
            </form>
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
              onClick={() => {
                if (!!_pollName)
                  onSubmit({
                    pollName: _pollName,
                    pollDescription: _pollDescription,
                    imageInfo: _imageInfo,
                    index,
                  });
              }}
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
