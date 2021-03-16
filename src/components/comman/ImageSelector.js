import React, { useState } from "react";
import { CameraInput } from "./CameraInput";

export const ImageSelector = ({ onImageSelect, imageInfo }) => {
  const [toggleSelector, setToggleSelector] = useState(false);
  const [selector, setSelector] = useState("");
  const [isSelectonDone, setIsSelectonDone] = useState(false);
  const onSelector = (type) => {
    setToggleSelector(false);
    setSelector(type);
    if (!!imageInfo) {
      onImageSelect(null);
    }
  };

  const clearImage = () => {
    setSelector(0);
    onImageSelect(null);
  };

  return (
    <div className="row">
      <div className="col-lg-4 col-sm-12">
        <div className="dropdown" style={{ visibility: "visible" }}>
          <button
            className="btn btn-secondary dropdown-toggle"
            onClick={() => setToggleSelector(!toggleSelector)}
            type="button"
          >
            {selector ? (selector === 1 ? "Gallery" : "Camera") : "Upload"}
          </button>
          {toggleSelector ? (
            <div className="dropdown-menu dropdown-menu-option image-selector">
              <div
                className="dropdown-item"
                onClick={() => onSelector(1)}
                href="#"
              >
                From Gallery
              </div>
              <div
                className="dropdown-item"
                onClick={() => onSelector(2)}
                href="#"
              >
                Capture from Camera
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {selector && !!!imageInfo ? (
        <div className="col-lg-4 col-sm-12">
          {selector === 1 ? (
            <SelectFromSystem
              onImageSelect={onImageSelect}
              setIsSelectonDone={setIsSelectonDone}
              isSelectonDone={isSelectonDone}
            />
          ) : (
            <CaptureFromCamera
              onImageSelect={onImageSelect}
              setIsSelectonDone={setIsSelectonDone}
              isSelectonDone={isSelectonDone}
            />
          )}
        </div>
      ) : null}
      {!!imageInfo ? (
        <div className="col-lg-4 col-sm-12">
          <div className="image-warraper ml-3">
            <div className="clear-icon" onClick={clearImage}>
              X
            </div>
            <img alt="image" className="img-thumbnail" src={imageInfo} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

const SelectFromSystem = ({
  onImageSelect,
  setIsSelectonDone,
  isSelectonDone,
}) => {
  const onChange = (e) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      onImageSelect(reader.result);
      setIsSelectonDone(true);
    };
  };
  return (
    <div className="row">
      <div className="col-12">
        {!isSelectonDone ? (
          <div style={{ margin: "20px" }}>
            <input type="file" onChange={onChange} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CaptureFromCamera = ({ onImageSelect }) => {
  return <CameraInput onImageSelect={onImageSelect} />;
};
