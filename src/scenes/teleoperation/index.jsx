import { Box, Divider, Typography, useTheme } from "@mui/material";

import Header from "../../components/Header";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { rosServer, isConnected } from "../../global";
import Camera from "../../materials/Camera/Camera";
import Map from "../../materials/Map/Map";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import { Card, Stack } from "react-bootstrap";
import ArrowController from "../../materials/ArrowController/ArrowController";

const Teleoperation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='TELEOPERATION' subtitle='Subtitle' />
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
