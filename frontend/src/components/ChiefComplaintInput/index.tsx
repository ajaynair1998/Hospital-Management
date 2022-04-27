import React, { useState } from "react";
import {
	Box,
	TextField,
	Select,
	InputLabel,
	MenuItem,
	SelectChangeEvent,
	FormControl,
	Button,
} from "@mui/material";

const ChiefComplaintInput = () => {
	let [type, setType] = useState("hours");

	let handleChangeType = (e: SelectChangeEvent<string>) => {
		setType(e.target.value);
	};
	return (
		<Box
			component="form"
			sx={{
				"& > :not(style)": { m: 2, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				id="outlined-basic"
				label="Complaint"
				variant="outlined"
				sx={{ width: "200px!important" }}
			/>
			<TextField
				id="outlined-basic"
				label="Duration"
				variant="outlined"
				sx={{ width: "200px!important" }}
			/>
			<FormControl sx={{ width: "200px!important" }}>
				<InputLabel id="demo-simple-select-label"> type</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={type}
					label="type"
					onChange={(e) => handleChangeType(e)}
				>
					<MenuItem value={"hours"}>Hours</MenuItem>
					<MenuItem value={"weeks"}>Weeks</MenuItem>
					<MenuItem value={"days"}>Days</MenuItem>
					<MenuItem value={"months"}>Months</MenuItem>
					<MenuItem value={"years"}>Years</MenuItem>
				</Select>
			</FormControl>

			<TextField
				id="outlined-multiline-static"
				label="Details"
				multiline
				rows={4}
				defaultValue="Default Value"
				sx={{ width: "300px!important" }}
			/>

			<Button
				variant="contained"
				sx={{
					width: "80px!important",
				}}
			>
				Add
			</Button>
		</Box>
	);
};

export default ChiefComplaintInput;
