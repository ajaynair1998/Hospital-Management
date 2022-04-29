import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { setChiefComplaints } from "../../redux/Reducers/patientTreatmentDetailsReducer";

const ChiefComplaintInput = () => {
	const dispatch = useDispatch();
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [complaint, setComplaint] = useState("");
	let [type, setType] = useState("hours");
	let [duration, setDuration] = useState("");
	let [details, setDetails] = useState("");

	let handleChangeType = (e: SelectChangeEvent<string>) => {
		setType(e.target.value);
	};

	const handleAdd = async () => {
		try {
			const response = await window.electron.ChiefComplaintsApi.post({
				treatmentDetailId: 1,
				details: details,
				complaint: complaint,
				duration: duration,
			});

			let allComplaints = await window.electron.ChiefComplaintsApi.get({
				treatmentDetailId: 1,
			});
			console.log(allComplaints);

			dispatch(setChiefComplaints(allComplaints.data));
			setComplaint("");
			setType("hours");
			setDuration("");
			setDetails("");
		} catch (err: any) {
			console.log(err.message);
		}
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
				value={complaint}
				sx={{ width: "200px!important" }}
				onChange={(e) => setComplaint(e.target.value)}
			/>
			<TextField
				id="outlined-basic"
				label="Duration"
				variant="outlined"
				value={duration}
				sx={{ width: "200px!important" }}
				onChange={(e) => setDuration(e.target.value)}
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
				value={details}
				defaultValue="Default Value"
				sx={{ width: "300px!important" }}
				onChange={(e) => setDetails(e.target.value)}
			/>

			<Button
				variant="contained"
				sx={{
					width: "80px!important",
				}}
				onClick={() => handleAdd()}
			>
				Add
			</Button>
		</Box>
	);
};

export default ChiefComplaintInput;
