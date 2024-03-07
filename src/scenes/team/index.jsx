import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { rosServer, isConnected } from "../../global";
import Camera from "../../materials/Camera/Camera"
import Map from "../../materials/Map/Map"

const Team = () => {
  return ( <>
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
    </Box>
    {isConnected && <Camera ros={rosServer} />} </>
  );
};

export default Team;
