import { Box, Divider, Stack, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Map from "../../materials/Map/Map";
import Status from "../../materials/Status/Status";
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
      console.error(`Kệ nó đi :vv ${e.message}`);
    }
  }, []);

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />
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
        >
          <StatBox
            title='12,361'
            subtitle='Emails Sent'
            progress='0.75'
            increase='+14%'
            icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title='431,225'
            subtitle='Sales Obtained'
            progress='0.50'
            increase='+21%'
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title={`${velocity}`}
            subtitle='Velocity (m/s)'
            progress='0.5'
            // increase='+5%'
            // icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
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
      <Stack direction={"row"} columnGap={"12px"} display={"flex"} style={{ justifyContent: "space-between" }}>
        <Box flex={2}>{isConnected && <Map ros={rosServer} />}</Box>
        {/* <Box flex={1}>
          {isConnected && <Waypoints />}
        </Box> */}
      </Stack>
    </Box>
  );
};

export default Dashboard;
