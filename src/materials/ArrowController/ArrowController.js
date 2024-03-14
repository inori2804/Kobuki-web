import { Box, Button } from "@mui/material";
import { Stop } from "@mui/icons-material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import React from "react";
import ROSLIB from "roslib";
import { rosServer } from "../../global";

class ArrowController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
    };
  }

  setController(linearX, angularZ) {
    if (rosServer != null) {
      let cmdVel = new ROSLIB.Topic({
        ros: rosServer,
        name: '/mobile_base/commands/velocity',
        messageType: 'geometry_msgs/Twist'
      });
      let newVelMsg = new ROSLIB.Message({
        linear: {
          x: linearX,
          y: 0,
          z: 0,
        },
        angular: {
          x: 0,
          y: 0,
          z: angularZ,
        }
      });
      cmdVel.publish(newVelMsg);
    }
  }

  handleButtonDown(linearX, angularZ) {
    const intervalId = setInterval(() => {
      this.setController(linearX, angularZ);
    }, 100); // Adjust interval as needed
    this.setState({ intervalId });
  }

  handleButtonUp() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <Box style={{ display: "flex", backgroundColor: "#1F2A40"}}>
        <Box style={{ margin: "auto", display: "flex", flexDirection: "column", alignItems: 'center' }}>
          <Button sx={styles.btn}
            onMouseDown={() => this.handleButtonDown(this.props.linearX, 0)}
            onMouseUp={() => this.handleButtonUp()}
            onTouchStart={() => this.handleButtonDown(this.props.linearX, 0)}
            onTouchEnd={() => this.handleButtonUp()}>
            <KeyboardDoubleArrowUpIcon sx={{ color: "#ffff", fontSize: "50px" }}/>
          </Button>
          <Box>
            <Button sx={styles.btn}
              onMouseDown={() => this.handleButtonDown(0, this.props.angularZ)}
              onMouseUp={() => this.handleButtonUp()}
              onTouchStart={() => this.handleButtonDown(0, this.props.angularZ)}
              onTouchEnd={() => this.handleButtonUp()}>
              <KeyboardDoubleArrowLeftIcon sx={{ color: "#ffff", fontSize: "50px" }}/>
            </Button>
            <Button sx={styles.btn}
              onMouseDown={() => this.handleButtonDown(0, 0)}
              onMouseUp={() => this.handleButtonUp()}
              onTouchStart={() => this.handleButtonDown(0, 0)}
              onTouchEnd={() => this.handleButtonUp()}>
              <Stop sx={{ color: "#ffff", fontSize: "50px" }}/>
            </Button>
            <Button sx={styles.btn}
              onMouseDown={() => this.handleButtonDown(0, -this.props.angularZ)}
              onMouseUp={() => this.handleButtonUp()}
              onTouchStart={() => this.handleButtonDown(0, -this.props.angularZ)}
              onTouchEnd={() => this.handleButtonUp()}>
              <KeyboardDoubleArrowRightIcon sx={{ color: "#ffff", fontSize: "50px" }}/>
            </Button>
          </Box>
          <Button sx={styles.btn}
              onMouseDown={() => this.handleButtonDown(-this.props.linearX, 0)}
              onMouseUp={() => this.handleButtonUp()}
              onTouchStart={() => this.handleButtonDown(-this.props.linearX, 0)}
              onTouchEnd={() => this.handleButtonUp()}>
            <KeyboardDoubleArrowDownIcon sx={{ color: "#ffff", fontSize: "50px" }} />
          </Button>
        </Box>
      </Box>
    );
  }
}

const styles = {
  btn: {
    width: '80px',
    height: '80px',
    margin: '8px',
    border: '1px solid #ffff',
    borderRadius: '12px',
    backgroundColor: '#3da58a',
  },
};

export default ArrowController;
