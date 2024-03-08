import React, { Component } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import ROSLIB from "roslib";
import "../CommonStyle.css";
import "./Camera.css";
import { Typography } from "@mui/material";

var tempImage = require("./not-available.png");

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableCamera: false,
    };
    this.ros = props.ros || null;
    this.subCamera = null;
    this.subcribeCameraTopic = this.subcribeCameraTopic.bind(this);
    this.unsubscribeCameraTopic = this.unsubscribeCameraTopic.bind(this);
  }

  subcribeCameraTopic() {
    if (this.subCamera) {
      let id = "camera_01";
      this.subCamera.subscribe(function (message) {
        document.getElementById(id).src = "data:image/jpg;base64," + message.data;
      });
    }
  }
  unsubscribeCameraTopic() {
    let id = "camera_01";
    if (this.subCamera) {
      this.subCamera.unsubscribe();
      document.getElementById(id).src = tempImage;
    }
  }

  componentDidMount() {
    if (this.ros != null) {
      this.ros = this.props.ros;
      this.subCamera = new ROSLIB.Topic({
        ros: this.ros,
        name: "/camera_01/rgb/image_raw/compressed",
        messageType: "sensor_msgs/CompressedImage",
      });
    }
  }

  render() {
    return (
      <Container className='box-margin'>
        <Card>
          <Card.Header style={{ display: "flex", justifyContent: 'space-between' }}>
            <Typography sx={{fontSize: '1.2rem', fontWeight: '500'}}>Camera {this.props.number}</Typography>
            <label className='switch'>
              <input
                onChange={(event) => {
                  this.setState({ enableCamera: event.target.checked });
                  if (this.state.enableCamera) this.unsubscribeCameraTopic();
                  else this.subcribeCameraTopic();
                }}
                checked={this.state.enableCamera}
                type='checkbox'
              />
              <span className='slider round'></span>
            </label>
          </Card.Header>
          <Card.Body style={{ padding: 0}}>
            <Container className='camera-container' style={{padding: 0}}>
              <img id={"camera_01"} width={'100%'} src={tempImage} alt='new'></img>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Camera;
