import React, { Component } from "react";
import { Container, Form, Row, Col, Alert, Modal } from "react-bootstrap";
import ROSLIB from "roslib";
import Nav2d from "react-nav2djs";
import Waypoints from "../Waypoints/Waypoints";
import { Box, Button } from "@mui/material";
import NearMeDisabledIcon from '@mui/icons-material/NearMeDisabled';
import NearMeIcon from '@mui/icons-material/NearMe';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import CancelIcon from '@mui/icons-material/Cancel';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';

import "../CommonStyle.css";
import "./Map.css";
class Map extends Component {
  constructor(props) {
    super(props);
    this.ros = props.ros || null;
    this.state = {
      command: "none",
      message: "Robot is ready !",
      stationName: "NoName",
      enableCancel: false,
      stations: [],
      goal: null,
      showModal: false,
    };
    this.onAddStation = this.onAddStation.bind(this);
    this.onClickStation = this.onClickStation.bind(this);
    this.onSetGoal = this.onSetGoal.bind(this);
    this.cancelGoal = this.cancelGoal.bind(this);
    this.actionClient = null;
    this.InsertStationService = null;
    this.DeleteStationService = null;
    this.GetStationService = null;
  }

  componentDidMount() {
    if (this.props.ros != null) {
      this.ros = this.props.ros;
      var serverName = this.props.serverName || "/move_base";
      var actionName = this.props.actionName || "move_base_msgs/MoveBaseAction";
      this.actionClient = new ROSLIB.ActionClient({
        ros: this.ros,
        actionName: actionName,
        serverName: serverName,
      });
      this.InsertStationService = new ROSLIB.Service({
        ros: this.ros,
        name: "/add_station",
        serviceType: "kobuki_ui/AddStation",
      });
      this.DeleteStationService = new ROSLIB.Service({
        ros: this.ros,
        name: "/delete_station",
        serviceType: "kobuki_ui/DeleteStation",
      });
      this.GetStationService = new ROSLIB.Service({
        ros: this.ros,
        name: "/get_station_list",
        serviceType: "kobuki_ui/GetStationList",
      });
      this.GetStationService.callService(null, (res) => {
        this.setState({ stations: res.station_list });
      });
    }
  }

  onAddStation(newStation) {
    if (newStation) {
      var stationList = this.state.stations;
      stationList.push(newStation);
      this.setState({ stations: stationList });
      console.log("added new station", newStation.name);
      var request = new ROSLIB.ServiceRequest({
        name: newStation.name,
        positionX: newStation.positionX,
        positionY: newStation.positionY,
        positionZ: newStation.positionZ,
        orientationX: newStation.orientationX,
        orientationY: newStation.orientationY,
        orientationZ: newStation.orientationZ,
        orientationW: newStation.orientationW,
        id: newStation.id,
      });
      this.InsertStationService.callService(request);
    }
  }

  onClickStation(stationId) {
    var targetIndex = -1;
    this.state.stations.forEach((item, index) => {
      if (item.id === stationId) {
        targetIndex = index;
      }
    });
    if (targetIndex >= 0) {
      if (this.state.command === "DeleteStation") {
        console.log("remove station", this.state.stations[targetIndex].name);
        var request = new ROSLIB.ServiceRequest({
          id: this.state.stations[targetIndex].id,
        });
        this.DeleteStationService.callService(request);
        var stationList = this.state.stations;
        stationList.splice(targetIndex, 1);
        this.setState({ stations: stationList });
      } else {
        console.log("Go to station", this.state.stations[targetIndex].name);
        var positionVec3 = new ROSLIB.Vector3(null);
        var orientation = new ROSLIB.Quaternion({
          x: this.state.stations[targetIndex].orientationX,
          y: this.state.stations[targetIndex].orientationY,
          z: this.state.stations[targetIndex].orientationZ,
          w: this.state.stations[targetIndex].orientationW,
        });

        positionVec3.x = this.state.stations[targetIndex].positionX;
        positionVec3.y = this.state.stations[targetIndex].positionY;

        var pose = new ROSLIB.Pose({
          position: positionVec3,
          orientation: orientation,
        });

        var goal = new ROSLIB.Goal({
          actionClient: this.actionClient,
          goalMessage: {
            target_pose: {
              header: {
                frame_id: "map",
              },
              pose: pose,
            },
          },
        });
        this.setState({
          message: "Robot is moving to the Waypoint: " + this.state.stations[targetIndex].name,
          enableCancel: true,
          command: "CancelGoal",
          goal: goal,
        });
        goal.send();
        goal.on("result", () => {
          if (this.state.enableCancel === false) {
            this.setState({ showModal: true });
          } else {
            this.setState({ showModal: true, command: "none", message: "Robot is ready !", enableCancel: false });
          }
        });
      }
    }
  }

  onSetGoal(rootObject, targetMarker, pose) {
    console.log("Added new goal");
    var goal = new ROSLIB.Goal({
      actionClient: this.actionClient,
      goalMessage: {
        target_pose: {
          header: {
            frame_id: "map",
          },
          pose: pose,
        },
      },
    });
    this.setState({ message: "Robot is moving to Goal", enableCancel: true, goal: goal });
    goal.send();
    goal.on("result", () => {
      rootObject.removeChild(targetMarker);
      if (this.state.enableCancel === false) {
        this.setState({ showModal: true });
      } else {
        this.setState({ showModal: true, command: "none", message: "Robot is ready !", enableCancel: false });
      }
    });
  }

  cancelGoal() {
    this.state.goal.cancel();
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <Container
        className='box-margin'
        style={{ padding: 0 }}
        onClick={() => {
          console.log("Click Map component");
        }}
      >
        <Container className='map-container' id='map' style={{ padding: 0 }}>
          <Container className='map-controller'>
            <h4 style={{ textAlign: 'center', color: "white" }}>CONTROLLER</h4>
            <Container style={{ width: "100%", minWidth: '300px', height: "4rem", padding: 0 }}>
              {this.state.command === "AddStation" && (
                <Alert variant='info' style={{ padding: "9px 16px", width: "100%" }}>
                  <Form onChange={(event) => this.setState({ stationName: event.target.value })}>
                    <Form.Group as={Row} controlId='formHorizontalEmail'>
                      <Form.Label column sm={3}>
                        Waypoint:
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control type='text' placeholder='ex: Position 1' />
                      </Col>
                    </Form.Group>
                  </Form>
                </Alert>
              )}
              {this.state.command !== "AddStation" && <Alert variant='info'>{this.state.message}</Alert>}
            </Container>
            <Box>
              <Button
                className={this.state.command === "SetGoal" ? "map-button btn-color-active" : "map-button btn-color"}
                onClick={() => this.setState({ command: "SetGoal", message: "Please choose the destion on the Map" })}
                sx={{
                  backgroundColor: "#3d3d3d",
                  color: "#e0e0e0",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  width: "100%",
                }}
              >
                <NearMeIcon sx={{ mr: "10px" }} />
                Creating the new Goal
              </Button>
            </Box>

            <Box>
              <Button
                className={this.state.command === "AddStation" ? "map-button btn-color-active" : "map-button btn-color"}
                onClick={() =>
                  this.setState({ command: "AddStation", message: "Adding the new Waypoint", stationName: "NoName" })
                }
                sx={{
                  backgroundColor: "#3d3d3d",
                  color: "#e0e0e0",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  width: "100%",
                }}
              >
                <AddLocationAltIcon sx={{ mr: "10px" }} />
                Creating the new Waypoint
              </Button>
            </Box>

            <Box>
              <Button
                className={
                  this.state.command === "DeleteStation" ? "map-button btn-color-active" : "map-button btn-color"
                }
                onClick={() => this.setState({ command: "DeleteStation", message: "Click to delete the Waypoint" })}
                sx={{
                  backgroundColor: "#3d3d3d",
                  color: "#e0e0e0",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  width: "100%",
                }}
              >
                <LocationOffIcon sx={{ mr: "10px" }} />
                Deleting the Waypoint
              </Button>
            </Box>

            <Box>
              <Button
                className='map-button'
                variant='outline-warning'
                onClick={() => this.setState({ command: "none", message: "Robot is ready !" })}
                sx={{
                  backgroundColor: "#3d3d3d",
                  color: "#e0e0e0",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  width: "100%",
                }}
              >
                <CancelIcon sx={{ mr: "10px" }} />
                Canceling the Action
              </Button>
            </Box>
            <Container style={{ padding: 0 }}>
              <Box>
                <Button
                  variant='danger'
                  sx={{
                    backgroundColor: "#3d3d3d",
                    color: "#e0e0e0",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    width: "100%",
                  }}
                  disabled={this.state.enableCancel ? false : true}
                  onClick={() => {
                    this.setState({ command: "CancelGoal", message: "Canceling the Command", enableCancel: false });
                    this.cancelGoal();
                  }}
                >
                  <NearMeDisabledIcon sx={{ mr: "10px" }} />
                  Canceling the current Goal
                </Button>
              </Box>
            </Container>
          </Container>
          <Container className='map-render'>
            <h4 style={{ textAlign: 'center' , color:"white"}}>MAP</h4>
            <Nav2d
              id='random'
              imageRobot={require("./kobuki.png")}
              imageGoalArrow={require("./waypoint-red.png")}
              imageStationArrow={require("./waypoint-green.png")}
              ros={this.ros}
              serverName='/move_base'
              command={this.state.command}
              onSetGoal={(obj, targetMarker, pose) => this.onSetGoal(obj, targetMarker, pose)}
              onAddStation={(newStation) => this.onAddStation(newStation)}
              onClickStation={(station) => this.onClickStation(station)}
              stationName={this.state.stationName}
              station={this.state.stations}
            />
          </Container>
          <Container className="map-waypoints" style={{ padding: 0 }}>
            <Waypoints state={this.state} onClickStation={this.onClickStation} />
          </Container>
          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.command === "CancelGoal" ? "Goal cancel" : "Action completed"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.command === "CancelGoal"
                ? "The goal has been cancelled."
                : "The robot has reached its destination."}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={this.handleCloseModal}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Container>
    );
  }
}

export default Map;
