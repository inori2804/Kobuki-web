import { Box, Divider, Stack } from "@mui/material";
import Header from "../../components/Header";
import Map from "../../materials/Map/Map";
import { isConnected, rosServer } from "../../global";
import StatusBar from "../../components/StatusBar"

const Dashboard = () => {

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Main Controller'/>
      </Box>

      <StatusBar/>

      <Divider sx={{ mt: "24px", mb: "24px" }} />
      <Stack direction={"row"} columnGap={"12px"} display={"flex"} style={{ justifyContent: "space-between" }}>
        <Box flex={2}>{isConnected && <Map ros={rosServer} />}</Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
