import { Box, Button } from "@mui/material";
import { ArrowDownward, ArrowUpward, Redo, Stop, Undo } from "@mui/icons-material";
import React from "react";

function ArrowController() {
  return (
    <Box style={{ display: "flex" }}>
      <Box style={{ margin: "auto", display: "flex", flexDirection: "column" , alignItems: 'center'}}>
        <Button sx={styles.btn}>
          <ArrowUpward />
        </Button>
        <Box>
          <Button sx={styles.btn}>
            <Undo />
          </Button>
          <Button sx={styles.btn}>
            <Stop />
          </Button>
          <Button sx={styles.btn}>
            <Redo />
          </Button>
        </Box>
        <Button sx={styles.btn}>
          <ArrowDownward />
        </Button>
      </Box>
    </Box>
  );
}

const styles = {
  btn: {
    width: '80px',
    height: '80px',
    margin: '8px',
    border: '1px solid #0d6efd',
    borderRadius: '12px',
  },
};

export default ArrowController;
