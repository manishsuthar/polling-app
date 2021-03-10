import React from "react";

export const Input = function ({
  value = "",
  type = "text",
  onChange,
  name,
  placeholder = "Please Enter",
}) {
  return (
    <div className="form-group">
      <input
        name={name}
        type={type}
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export const Button = function ({ className, onClick, text = "Submit" }) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export const ListItem = ({
  imageInfo,
  pollName,
  pollDescription,
  points = 0,
  onEdit,
  index,
  onSelectPoll,
  selectedDishes,
  isFull,
  onPointClick,
}) => {
  const isSelected = selectedDishes ? selectedDishes.includes(index) : false;
  return (
    <div
      onClick={onSelectPoll ? () => onSelectPoll(index) : () => {}}
      className={`${isFull ? "col-6" : "col-lg-3 col-md-6 col-sm-6"}`}
    >
      <div
        className={`card card-stats ${
          isSelected ? "list-item-selected shadow" : ""
        }`}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-5 col-md-4">
              <div className="icon-big text-center icon-warning">
                <img
                  onError={(e) => {
                    e.target.src =
                      "https://dummyimage.com/600x400/000/fff&text=Dish";
                  }}
                  src={imageInfo}
                />
              </div>
            </div>
            <div className="col-7 col-md-8">
              <div className="numbers">
                <p className="card-title">{pollName}</p>
                <p className="card-category">{pollDescription}</p>
              </div>
            </div>
          </div>
        </div>
        {onEdit ? (
          <div className="card-footer ">
            <hr />
            <div className="stats">
              <Button
                onClick={() => onEdit(index)}
                className="btn btn-pill text-white btn-block btn-primary"
                text={`Edit`}
              />
            </div>
          </div>
        ) : (
          <div className="card-footer ">
            <hr />
            {!onPointClick ? (
              <div className="stats">{points}</div>
            ) : (
              <div>
                <span
                  className={`star-icon m-1 ${
                    points > 9 ? "star-icon-selected" : ""
                  }`}
                  onClick={() => onPointClick(index, 10)}
                  text="Avg"
                >
                  &#9733;
                </span>
                <span
                  className={`star-icon m-1 ${
                    points > 19 ? "star-icon-selected" : ""
                  }`}
                  onClick={() => onPointClick(index, 20)}
                  text="Good"
                >
                  &#9733;
                </span>
                <span
                  className={`star-icon m-1 ${
                    points > 29 ? "star-icon-selected" : ""
                  }`}
                  onClick={() => onPointClick(index, 30)}
                  text="Execilant"
                >
                  &#9733;
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
