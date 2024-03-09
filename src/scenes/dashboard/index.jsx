import { Box, Divider, Stack, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import RouteIcon from '@mui/icons-material/Route';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ComputerIcon from '@mui/icons-material/Computer';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Map from "../../materials/Map/Map";
import { isConnected, rosServer } from "../../global";
import { useEffect, useState } from "react";
import ROSLIB from "roslib";

const Dashboard = () => {
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
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Main Controller'/>
      </Box>

      {/* GRID & CHARTS */}
      <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gridAutoRows='140px' gap='20px'>
        {/* ROW 1 */}
        <Box
          gridColumn='span 3'
          backgroundColor="#1F2A40"
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={5}
        >
          <StatBox
            title='99.00'
            subtitle='Kobuki Battery (%)'
            progress='0.75'
            // increase='+14%'
            icon={<BatteryChargingFullIcon sx={{ color: "#3da58a", fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor="#1F2A40"
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={5}
        >
          <StatBox
            title='1.90'
            subtitle='Estimated Distance (m)'
            progress='0.50'
            // increase='+21%'
            icon={<RouteIcon sx={{ color: "#3da58a", fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor="#1F2A40"
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={5}
        >
          <StatBox
            title={`${velocity}`}
            subtitle='Speed (m/s)'
            progress='0.5'
            // increase='+5%'
            icon={<SpeedIcon sx={{ color: "#3da58a", fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor="#1F2A40"
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={5}
        >
          <StatBox
            title='70.00'
            subtitle='Ultilization (%)'
            progress='0.80'
            // increase='+43%'
            icon={<ComputerIcon sx={{ color: "#3da58a", fontSize: "26px" }} />}
          />
        </Box>
      </Box>
      <Divider sx={{ mt: "24px", mb: "24px" }} />
      <Stack direction={"row"} columnGap={"12px"} display={"flex"} style={{ justifyContent: "space-between" }}>
        <Box flex={2}>{isConnected && <Map ros={rosServer} />}</Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
