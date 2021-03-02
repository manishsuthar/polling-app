import React, { Component } from "react";

export class CameraInput extends Component {
  processDevices(devices) {
    devices.forEach((device) => {
      this.setDevice(device);
    });
  }

  async setDevice(device) {
    const { deviceId } = device;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId },
    });
    this.videoPlayer.srcObject = stream;
    this.videoPlayer.play();
  }

  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(cameras);
  }

  async componentWillUnmount() {
    const stream = this.videoPlayer.srcObject;
    stream.getTracks().forEach(function (track) {
      if (track.readyState === "live" && track.kind === "video") {
        track.stop();
      }
    });
    this.videoPlayer.pause();
  }

  takePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.height = 300;
    canvas.width = 300;
    const context = canvas.getContext("2d");
    context.drawImage(this.videoPlayer, 0, 0, 300, 300);
    this.props.onImageSelect(canvas.toDataURL());
  };

  render() {
    return (
      <div className="c-camera-feed">
        <div className="c-camera-feed__viewer">
          <video
            ref={(ref) => (this.videoPlayer = ref)}
            width="300"
            heigh="300"
          />
        </div>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={this.takePhoto}
        >
          Take photo
        </button>
      </div>
    );
  }
}
