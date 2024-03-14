import React, { useState } from "react";
import { Container, Stack } from "react-bootstrap";
import {Button} from "@mui/material"

function Waypoints({ state, onClickStation, ...props }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    onClickStation(e.target.value);
  };

  return (
    <Container style={{ padding: 0 }}>
      <Stack>
        <h4 style={{ textAlign: 'center' ,color:"white"}}>LIST of WAYPOINTS</h4>
      </Stack>
      <Stack>
        {state.stations.map((item) => (
          <Button
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              marginBottom: "4px",
              padding: "8px 16px",
              width: "100%",
              justifyContent: "center",
              backgroundColor: item.id === selected ? 'blue' : "#4cceac",
              color: item.id === selected ? 'white' : 'white',
              "&:hover": {
                backgroundColor: "#B47800",
                color: "black", // You can adjust the text color when hovering
              },
            }}
            className={`${item.id === selected ? "btn-color-active" : ""} select-button btn-color`}
            onClick={handleSelect}
            selected={item.id === selected}
            value={item.id}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </Container>
  );
}

export default Waypoints;
