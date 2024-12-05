import React, { useState } from 'react';
import { Select, MenuItem, Button, Typography } from '@mui/material';

const predefinedNames = [
    { name: "Anna", marriage: "Łukasz" },
    { name: "Łukasz", marriage: "Anna" },
    { name: "Tomek", marriage: "Aga" },
    { name: "Aga", marriage: "Tomek" },
    { name: "Zofia", marriage: "Marcin" },
    { name: "Marcin", marriage: "Zofia" },
    { name: "Piotr", marriage: "Maria" },
    { name: "Maria", marriage: "Piotr" },
];

const App = () => {
    const [name, setName] = useState("");
    const [availableNames, setAvailableNames] = useState(predefinedNames);
    const [selectedName, setSelectedName] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLosuj = () => {
        if (!name) {
            alert("Please select a name before drawing!");
            return;
        }

        const nameEntry = availableNames.find((entry) => entry.name === name);

        if (!nameEntry) {
            alert("Selected name is not available!");
            return;
        }

        const eligibleNames = availableNames.filter(
            (entry) =>
                entry.name !== nameEntry.name && entry.name !== nameEntry.marriage
        );

        if (eligibleNames.length === 0) {
            alert("No eligible names left to draw!");
            return;
        }

        const randomIndex = Math.floor(Math.random() * eligibleNames.length);
        const randomName = eligibleNames[randomIndex].name;

        setSelectedName(randomName);

        // Remove the selected name and its marriage pair from available names
        setAvailableNames((prev) =>
            prev.filter(
                (entry) =>
                    entry.name !== randomName && entry.name !== nameEntry.marriage
            )
        );
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h4">Name Drawing App</Typography>

            <div style={{ margin: "20px 0" }}>
                <Select
                    value={name}
                    onChange={handleNameChange}
                    displayEmpty
                    style={{ minWidth: "200px" }}
                >
                    <MenuItem value="">
                        <em>Select your name</em>
                    </MenuItem>
                    {availableNames.map((entry) => (
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
                    You drew: {selectedName}
                </Typography>
            )}
        </div>
    );
};

export default App;
