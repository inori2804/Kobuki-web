import React, { Component } from 'react';
import ROSLIB from "roslib";
import "./MainPage.css";
import { setRosServer, setIsConnected } from '../../global';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnectedWS: false,
      linearVel: 0.2,
      angularVel: 0.45,
    };
    this.url = "ws://192.168.0.112:9090";
    this.ros = null;
    this.cmdVel = null;
    this.connectWebsocket = this.connectWebsocket.bind(this);
    this.registerTopic = this.registerTopic.bind(this);
    this.onChangeAngularVel = this.onChangeAngularVel.bind(this);
    this.onChangeLinearVel = this.onChangeLinearVel.bind(this);
  }

  registerTopic() {
    if (this.isConnectedWS === false) {
      return;
    }
    this.cmdVel = new ROSLIB.Topic({
      ros: this.ros,
      name: '/cmd_vel_mux/keyboard_teleop',
      messageType: 'geometry_msgs/Twist'
    });
    console.log("Register Topic /cmd_vel_mux/keyboard_teleop");
  }

  connectWebsocket() {
    this.ros = new ROSLIB.Ros({
      url: this.url,
    });
    this.ros.on("connection", () => {
      this.setState({ isConnectedWS: true });
      console.log("Connected to websocket server " + this.url);
      this.registerTopic();

      //update global variable
      setRosServer(this.ros);
      setIsConnected(true);
    });
    this.ros.on("error", (err) => {
      console.log("Error connecting to websocket server ", err);
    });
    this.ros.on("close", () => {
      this.setState({ isConnectedWS: false });
      console.log("Connection to websocket server closed, try to connect after 3s");
      setTimeout(() => {
        this.connectWebsocket();
      }, 3000);
    });
  }

  // Parameters callback
  onChangeLinearVel(vel) {
    var linearVel = vel;
    linearVel = linearVel > 1 ? 1 : linearVel;
    linearVel = linearVel < 0.05 ? 0.05 : linearVel;
    console.log("Linear velocity changed: " + linearVel);
    this.setState({ linearVel: linearVel });
  }

  onChangeAngularVel(vel) {
    var angularVel = vel;
    angularVel = angularVel > 1 ? 1 : angularVel;
    angularVel = angularVel < 0.05 ? 0.05 : angularVel;
    console.log("Angular velocity changed: " + angularVel);
    this.setState({ angularVel: angularVel });
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <button onClick={this.connectWebsocket}>Connect ROS Network</button>
      </div>
    )
  }
}

export default MainPage;
