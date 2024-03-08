import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Stack } from "react-bootstrap";

function Waypoints({ state, onClickStation, ...props }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    onClickStation(e.target.value);
  };

  return (
    <Container style={{ padding: 0 }}>
      <Stack>
        <h4>Waypoints</h4>
      </Stack>
      <Stack>
        {state.stations.map((item) => (
          <Button
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              marginBottom: "4px",
              padding: "8px 16px",
              width: "100%",
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
