import React, { useEffect, useState } from "react";
import { Select, MenuItem, Button, Typography } from "@mui/material";
import axios from "axios";

const App = () => {
  const [name, setName] = useState(""); // Selected name
  const [availableNames, setAvailableNames] = useState([]); // Names from the backend
  const [selectedName, setSelectedName] = useState(""); // The name that was drawn

  // Fetch names from the backend on component mount
  useEffect(() => {
    const fetchNames = async () => {
      const response = await axios.get("https://name-draw-app-back.onrender.com/api/names");
      setAvailableNames(response.data);
    };
    fetchNames();
  }, []);

  // Handle name selection
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handle "Losuj" button click
  const handleLosuj = async () => {
    if (!name) {
      alert("Please select a name before drawing!");
      return;
    }

    try {
      const response = await axios.post("https://name-draw-app-back.onrender.com/api/draw", { userName: name });
      const drawnName = response.data.drawnName;

      // Update the selected name
      setSelectedName(drawnName);

      // Update the available names:
      // 1. Remove the drawer from the dropdown.
      // 2. Keep all other names, including the drawn name.
      setAvailableNames((prevNames) =>
          prevNames.map((entry) =>
              entry.name === name
                  ? { ...entry, isDrawn: true } // Mark the drawer as drawn
                  : entry
          )
      );

      // Reset the selected name for the dropdown
      setName("");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred while drawing!");
    }
  };

  return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4">WYLOSUJ KOGO OBDARUJESZ PREZENTEM</Typography>

        <div style={{ margin: "20px 0" }}>
          <Select
              value={name}
              onChange={handleNameChange}
              displayEmpty
              style={{ minWidth: "200px" }}
          >
            <MenuItem value="">
              <em>Wybierz SWOJE imie!</em>
            </MenuItem>
            {availableNames
                .filter((entry) => !entry.isDrawn) // Exclude drawn names
                .map((entry) => (
                    <MenuItem key={entry.name} value={entry.name}>
                      {entry.name}
                    </MenuItem>
                ))}
          </Select>
        </div>

        <Button
            variant="contained"
            color="primary"
            onClick={handleLosuj}
            style={{ margin: "10px" }}
        >
          Losuj
        </Button>

        {selectedName && (
            <Typography variant="h6" style={{ marginTop: "20px" }}>
              Wylosowałeś/-aś: {selectedName}
            </Typography>
        )}
      </div>
  );
};

export default App;
