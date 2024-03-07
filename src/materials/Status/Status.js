import React, { Component } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import ROSLIB from "roslib";
import "../CommonStyle.css";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 0,
    };
    this.ros = props.ros || null;
    this.subVelocity = null;
  }
  componentDidMount() {
    if (this.ros !== null) {
      this.subVelocity = new ROSLIB.Topic({
        ros: this.ros,
        name: '/mobile_base/commands/velocity',
        messageType: 'geometry_msgs/Twist'
      });
      this.subVelocity.subscribe(function(message) {
        //this is speed data
        console.log("velocity message", Math.abs(Math.round(message.linear.x * 100) / 100));
        // this.setState({speed: Math.abs(Math.round(message.linear.x * 100) / 100)});
      });
    }
  }
  render() {
    return (
      <div></div>
    )
  }
}

export default Status;