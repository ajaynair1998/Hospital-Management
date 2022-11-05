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
	setEditPatientDataField,
	setNewPatientDataField,
} from "../../../../redux/Reducers/appStateDataReducer";
import CountrySelect, { CountryType } from "../../../CountrySelect";
import DateInput from "../../../DateInput";

const StageZero = () => {
	let dispatch = useDispatch();
	let { name, date_of_birth, nationality, gender } = useSelector(
		(state: IStore) => state.applicationDataStore.editPatient
	);
	const handleChangeDate = (value: any) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("dateOfBirth"),
					value: value,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChangeGender = (value: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("gender"),
					value: value,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChangeName = (value: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("name"),
					value: value,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	const handleChangeNationality = (data: CountryType) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("nationality"),
					value: data,
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
					id="name"
					label="Name"
					variant="outlined"
					value={name}
					// sx={{ width: "200px!important" }}

					onChange={(e) => handleChangeName(e.target.value)}
				/>

				<DateInput
					handleChange={handleChangeDate}
					value={date_of_birth}
					label={"Date Of Birth"}
				/>

				<CountrySelect
					handleClickOption={handleChangeNationality}
					value={
						nationality
							? JSON.parse(nationality as unknown as string)
							: undefined
					}
				/>

				<FormControl>
					<InputLabel id="demo-simple-select-label"> Gender</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={gender}
						label="Gender"
						onChange={(e) => handleChangeGender(e.target.value)}
					>
						<MenuItem value={"not_selected"}>Not Selected</MenuItem>

						<MenuItem value={"male"}>Male</MenuItem>
						<MenuItem value={"female"}>Female</MenuItem>
						<MenuItem value={"other"}>Other</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</React.Fragment>
	);
};

export default StageZero;
