import { Box, Divider, Typography, useTheme } from "@mui/material";

import Header from "../../components/Header";
import TrafficIcon from "@mui/icons-material/Traffic";
import { rosServer, isConnected } from "../../global";
import Camera from "../../materials/Camera/Camera";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import { Card } from "react-bootstrap";
import ArrowController from "../../materials/ArrowController/ArrowController";
import RouteIcon from '@mui/icons-material/Route';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import { useEffect, useState } from "react";
import ROSLIB from "roslib";

const Teleoperation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [velocity, setVelocity] = useState("0.00");
  let subVelocity = null;

  const regVelocityTopic = () => {
    if (rosServer !== null) {
      subVelocity = new ROSLIB.Topic({
        ros: rosServer,
        name: "/mobile_base/commands/velocity",
        messageType: "geometry_msgs/Twist",
      });
    }
  };

  useEffect(() => {
    try {
      regVelocityTopic();
      subVelocity.subscribe(function (message) {
        setVelocity(Math.abs(Math.round(message.linear.x * 100) / 100).toFixed(2));
      });
      return () => {
        subVelocity.unsubscribe();
      };
    } catch (e) {
      console.error(`Some error ${e.message}`);
    }
  }, []);
  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Teleoperations'/>
      </Box>
      {/* GRID & CHARTS */}
      <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gridAutoRows='140px' gap='20px'>
        {/* ROW 1 */}
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={5}
        >
          <StatBox
            title='12,361'
            subtitle='Kobuki Battery (%)'
            progress='0.75'
            increase='+14%'
            icon={<BatteryChargingFullIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={5}
        >
          <StatBox
            title='431,225'
            subtitle='Estimated Distance'
            progress='0.50'
            increase='+21%'
            icon={<RouteIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={5}
        >
          <StatBox
            title={`${velocity}`}
            subtitle='Velocity (m/s)'
            progress='0.5'
            // increase='+5%'
            icon={<SpeedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={5}
        >
          <StatBox
            title='1,325,134'
            subtitle='Traffic Received'
            progress='0.80'
            increase='+43%'
            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
      </Box>
      <Divider sx={{ mt: "24px", mb: "24px" }} />
      <Box columnGap={"12px"} display={"flex"} style={{ justifyContent: "space-between" }}>
        <Box flex={1} display={"flex"} flexDirection={"column"} columnGap={"12px"}>
          <Box
            style={{ /* border: "1px solid #00000033", borderRadius: "6px", padding: "12px", */ marginBottom: "12px" }}
          >
            <Card>
              {/* <Card.Header>
                <Typography sx={{fontSize: '1.2rem', fontWeight: '500'}}>Cái gì đó</Typography>
              </Card.Header> */}
              <Card.Body>Nội dung cái gì đó</Card.Body>
            </Card>
          </Box>
          <Box>
            <Card>
              {/* <Card.Header>
                <Typography sx={{fontSize: '1.2rem', fontWeight: '500'}}>Controller</Typography>
              </Card.Header> */}
              <Card.Body>
                <ArrowController />
              </Card.Body>
            </Card>
          </Box>
        </Box>
        <Box flex={1}>
          <Camera ros={rosServer} />
        </Box>
      </Box>
    </Box>
  );
};

export default Teleoperation;
