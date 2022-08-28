import {
	FormControl,
	InputLabel,
	Menu,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CountrySelect from "../../../CountrySelect";
import DateInput from "../../../DateInput";

const StageOne = () => {
	let [phoneNumber, setPhoneNumber] = useState("");
	let [address, setAddress] = useState("");
	let [bloodGroup, setBloodGroup] = useState("Not Selected");
	let [maritalStatus, setMaritalStatus] = useState<string>("Not Selected");

	return (
		<React.Fragment>
			<Box
				component="form"
				sx={{
					// "& > :not(style)": { m: 2, width: "25ch" },
					"& > :not(style)": { m: 2, width: "90%" },
				}}
				noValidate
				autoComplete="off"
				display={"flex"}
				flexDirection={"column"}
			>
				<TextField
					id="outlined-basic"
					label="Phone Number"
					variant="outlined"
					value={phoneNumber}
					// sx={{ width: "200px!important" }}

					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<TextField
					id="outlined-multiline-static"
					label="Address"
					multiline
					rows={2}
					value={address}
					// sx={{ width: "300px!important" }}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<FormControl>
					<InputLabel id="demo-simple-select-label"> Marital Status</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={maritalStatus}
						label="Marital Status"
						onChange={(e) => setMaritalStatus(e.target.value)}
					>
						<MenuItem value={"Not Selected"}>Not Selected</MenuItem>

						<MenuItem value={"single"}>single</MenuItem>
						<MenuItem value={"married"}>married</MenuItem>
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel id="demo-simple-select-label"> Blood Group</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={bloodGroup}
						label="Blood Group"
						onChange={(e) => setBloodGroup(e.target.value)}
					>
						<MenuItem value="Not Selected">Not Selected</MenuItem>
						<MenuItem value="A+">A+</MenuItem>
						<MenuItem value="O+">O+</MenuItem>
						<MenuItem value="B+">B+</MenuItem>
						<MenuItem value="AB+">AB+</MenuItem>
						<MenuItem value="A-">A-</MenuItem>
						<MenuItem value="O-">O-</MenuItem>
						<MenuItem value="B-">B-</MenuItem>
						<MenuItem value="AB-">AB-</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</React.Fragment>
	);
};

export default StageOne;
