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
import { useDispatch, useSelector } from "react-redux";
import { returnDbPatientProperties } from "../../../../helpers/functions";
import { IStore } from "../../../../helpers/interfaces";
import {
	setEditPatientDataField,
	setNewPatientDataField,
} from "../../../../redux/Reducers/appStateDataReducer";
import CountrySelect from "../../../CountrySelect";
import DateInput from "../../../DateInput";

const StageOne = () => {
	let dispatch = useDispatch();
	let { phone_number, address, blood_group, marital_status } = useSelector(
		(store: IStore) => store.applicationDataStore.editPatient
	);
	const handleChangePhoneNumber = (data: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("phoneNumber"),
					value: data,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	const handleChangeAddress = (data: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("address"),
					value: data,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	const handleChangeBloodGroup = (data: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("bloodGroup"),
					value: data,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	const handleChangeMaritalStatus = (data: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("maritalStatus"),
					value: data,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

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
					value={phone_number}
					// sx={{ width: "200px!important" }}

					onChange={(e) => handleChangePhoneNumber(e.target.value)}
				/>
				<TextField
					id="outlined-multiline-static"
					label="Address"
					multiline
					rows={2}
					value={address}
					// sx={{ width: "300px!important" }}
					onChange={(e) => handleChangeAddress(e.target.value)}
				/>
				<FormControl>
					<InputLabel id="demo-simple-select-label"> Marital Status</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={marital_status}
						label="Marital Status"
						onChange={(e) => handleChangeMaritalStatus(e.target.value)}
					>
						<MenuItem value={"not_selected"}>Not Selected</MenuItem>

						<MenuItem value={"single"}>single</MenuItem>
						<MenuItem value={"married"}>married</MenuItem>
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel id="demo-simple-select-label"> Blood Group</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={blood_group}
						label="Blood Group"
						onChange={(e) => handleChangeBloodGroup(e.target.value)}
					>
						<MenuItem value="not_selected">Not Selected</MenuItem>
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
