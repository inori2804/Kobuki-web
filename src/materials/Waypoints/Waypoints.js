import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Stack } from "react-bootstrap";

const items = [
  {
    id: "01",
    name: "Point 01",
  },
  {
    id: "02",
    name: "Point 02",
  },
  {
    id: "03",
    name: "Point 03",
  },
  {
    id: "04",
    name: "Point 04",
  },
  {
    id: "05",
    name: "Point 05",
  },
  {
    id: "06",
    name: "Point 06",
  },
  {
    id: "07",
    name: "Point 07",
  },
];

function Waypoints() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <Container style={{ padding: 0 }}>
      <Stack>
        <h4>Waypoints</h4>
      </Stack>
      <Stack>
        {items.map((item) => (
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
            className={`${item.name === selected ? "btn-color-active" : ""} select-button btn-color`}
            onClick={handleSelect}
            selected={item.name === selected}
            value={item.name}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </Container>
  );
}

export default Waypoints;
