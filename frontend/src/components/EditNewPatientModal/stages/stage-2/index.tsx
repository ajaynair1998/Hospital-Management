import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { returnDbPatientProperties } from "../../../../helpers/functions";
import { IStore } from "../../../../helpers/interfaces";
import {
	setEditPatientDataField,
	setNewPatientDataField,
} from "../../../../redux/reducers/appStateDataReducer";

const StageTwo = () => {
	let dispatch = useDispatch();

	let { mobile_number, occupation, referred_by, email, phone_number } =
		useSelector((state: IStore) => state.applicationDataStore.editPatient);
	const handleChangeMobileNumber = (data: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("mobileNumber"),
					value: data,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	const handleChangeOccupation = (data: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("occupation"),
					value: data,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	const handleChangeReferredBy = (data: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("referredBy"),
					value: data,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	const handleChangeEmail = (data: string) => {
		try {
			dispatch(
				setEditPatientDataField({
					key: returnDbPatientProperties("email"),
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
					label="Email"
					variant="outlined"
					value={email}
					// sx={{ width: "200px!important" }}

					onChange={(e) => handleChangeEmail(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Mobile Number"
					variant="outlined"
					value={phone_number}
					// value={mobile_number}
					// sx={{ width: "200px!important" }}
					disabled
					onChange={(e) => handleChangeMobileNumber(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Occupation"
					variant="outlined"
					value={occupation}
					// sx={{ width: "200px!important" }}

					onChange={(e) => handleChangeOccupation(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Referred By"
					variant="outlined"
					value={referred_by}
					// sx={{ width: "200px!important" }}

					onChange={(e) => handleChangeReferredBy(e.target.value)}
				/>
			</Box>
		</React.Fragment>
	);
};

export default StageTwo;
