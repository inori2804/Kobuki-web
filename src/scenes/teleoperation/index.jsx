import { Box, Divider, Slider, Typography } from "@mui/material";
import React, { useState } from "react";

import Header from "../../components/Header";
import { rosServer } from "../../global";
import Camera from "../../materials/Camera/Camera";
import { Card } from "react-bootstrap";
import ArrowController from "../../materials/ArrowController/ArrowController";
import StatusBar from "../../components/StatusBar";

const Teleoperation = () => {
  const [linearX, setLinearX] = useState(0);
  const [angularZ, setAngularZ] = useState(0);

  const handleLinearChange = (event, newValue) => {
    setLinearX(newValue);
  };

  const handleAngularChange = (event, newValue) => {
    setAngularZ(newValue);
  };

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Teleoperations'/>
      </Box>
  
      <StatusBar />
  
      <Divider sx={{ mt: "24px", mb: "24px" }} />
      <Box columnGap={"12px"} display={"flex"}  style={{ justifyContent: "space-between" }}>
        <Box flex={1} display={"flex"} flexDirection={"column"} columnGap={"12px"} style={{ height: '100%' }}>
          <Box
            style={{ marginBottom: "12px", height: '100%' }}
          >
            <Card style={{backgroundColor: "#1F2A40", borderRadius:"10px", justifyContent:"center"}} sx={{ height: '100%' }}>
              <Card.Body>
                <Box display="flex" alignItems="center" flexDirection="column">
                  <Typography sx={{ color: "#ffff" }}>Linear's Speed Value (m/s)</Typography>
                  <Slider
                    value={linearX}
                    onChange={handleLinearChange}
                    aria-labelledby="linear-slider"
                    min={0}
                    max={0.5}
                    step={0.1}
                    style={{ width: 200, marginRight: 20, color:"#ffff" }}
                    sx={{ 'input[type="range"]::-moz-range-thumb': { backgroundColor: "#ffff" }, 'input[type="range"]::-webkit-slider-thumb': { backgroundColor: "#ffff" } }}
                  />
                  <Typography sx={{ color: "#ffff" }}>{linearX}</Typography>
                </Box>
                <Box display="flex" alignItems="center" flexDirection="column">
                  <Typography sx={{ color: "#ffff" }}>Angular's Speed Value (m/s)</Typography>
                  <Slider
                    value={angularZ}
                    onChange={handleAngularChange}
                    aria-labelledby="angular-slider"
                    min={0}
                    max={0.5}
                    step={0.1}
                    style={{ width: 200, marginRight: 20, color:"#ffff" }}
                    sx={{ 'input[type="range"]::-moz-range-thumb': { backgroundColor: "#ffff" }, 'input[type="range"]::-webkit-slider-thumb': { backgroundColor: "#ffff" } }}
                  />
                  <Typography sx={{ color: "#ffff" }}>{angularZ}</Typography>
                </Box>
              </Card.Body>
            </Card>
          </Box>
          <Box style={{ height: '100%' }}>
            <Card style={{backgroundColor: "#1F2A40"}} sx={{ height: '100%' }}>
              <Card.Body>
                <ArrowController linearX={linearX} angularZ={angularZ} />
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
