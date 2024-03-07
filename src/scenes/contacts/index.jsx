import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  return ( <>
    <Box m="20px">
      <Header title="Header" subtitle="Header content" />
    </Box> </>
  );
};

export default Contacts;
