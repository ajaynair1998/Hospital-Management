import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { returnDbPatientProperties } from "../../../../helpers/functions";
import { IStore } from "../../../../helpers/interfaces";
import {
	setNewMedicineDataField,
	setNewPatientDataField,
} from "../../../../redux/Reducers/appStateDataReducer";
import CountrySelect, { CountryType } from "../../../CountrySelect";
import DateInput from "../../../DateInput";

const StageZero = () => {
	let dispatch = useDispatch();
	let { name, strength, medicine_form, description } = useSelector(
		(state: IStore) => state.applicationDataStore.newMedicine
	);
	const handleChangeName = (value: any) => {
		try {
			dispatch(
				setNewMedicineDataField({
					key: "name",
					value: value,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChangeStrength = (value: string) => {
		try {
			dispatch(
				setNewMedicineDataField({
					key: "strength",
					value: value,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChangeMedicineForm = (value: string) => {
		try {
			dispatch(
				setNewMedicineDataField({
					key: "medicine_form",
					value: value,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	const handleChangeDescription = (value: string) => {
		try {
			dispatch(
				setNewMedicineDataField({
					key: "description",
					value: value,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {}, []);
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
					id="medicine_name"
					label="Medicine name"
					variant="outlined"
					value={name}
					// sx={{ width: "200px!important" }}

					onChange={(e) => handleChangeName(e.target.value)}
				/>
				<TextField
					id="strength"
					label="Strength"
					variant="outlined"
					value={strength}
					// sx={{ width: "200px!important" }}

					onChange={(e) => handleChangeStrength(e.target.value)}
				/>

				<FormControl>
					<InputLabel id="demo-simple-select-label"> Medicine Form</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={medicine_form}
						label="Medicine Form"
						onChange={(e) => handleChangeMedicineForm(e.target.value)}
					>
						<MenuItem value={"not_selected"}>Not Selected</MenuItem>

						<MenuItem value={"capsule"}>Capsule</MenuItem>
						<MenuItem value={"tablet"}>Tablet</MenuItem>
						<MenuItem value={"solution"}>Solution</MenuItem>

						<MenuItem value={"injection"}>Injection</MenuItem>

						<MenuItem value={"drops"}>Drops</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id="outlined-multiline-static"
					label="description"
					multiline
					rows={3}
					value={description}
					// sx={{ width: "300px!important" }}
					onChange={(e) => handleChangeDescription(e.target.value)}
				/>
			</Box>
		</React.Fragment>
	);
};

export default StageZero;
