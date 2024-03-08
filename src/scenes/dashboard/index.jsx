import { Box, Divider, Stack, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Map from "../../materials/Map/Map";
import { isConnected, rosServer } from "../../global";
import Waypoints from "../../materials/Waypoints/Waypoints";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            title='32,441'
            subtitle='New Clients'
            progress='0.30'
            increase='+5%'
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
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
        <Box flex={1}>
          {isConnected && <Waypoints />}
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
