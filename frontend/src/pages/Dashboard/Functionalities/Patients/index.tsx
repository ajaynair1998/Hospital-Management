import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AsyncSearchBar from "../../../../components/AsyncSearchBar";
import AddIcon from "@mui/icons-material/Add";
import AddNewPatientInputModal from "../../../../components/AddNewPatientModal";
import AddNewPatient from "./AddNewPatient";
import { setAddNewPatientInputDialogState } from "../../../../redux/Reducers/utilDataReducer";
import PatientInfo from "./PatientInfo";
import {
	resetSelectedPatientDataFields,
	setSelectedPatientConsultationDetails,
	setSelectedPatientProfileDetails,
} from "../../../../redux/Reducers/appStateDataReducer";
import { IStore } from "../../../../helpers/interfaces";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Patients = () => {
	const [patients, setPatients] = useState<any>([]);
	let dispatch = useDispatch();
	const handleClickAddPatient = () => {
		try {
			dispatch(
				setAddNewPatientInputDialogState({ addNewPatientInputDialogOpen: true })
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChangeSearch = async (searchTerm: string) => {
		try {
			let patients = await window.electron.PatientApi.get({
				searchTerm: searchTerm,
			});
			setPatients(patients.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSelectedPatientChange = async (
		e: React.SyntheticEvent<Element, Event>,
		value: any
	) => {
		try {
			let patientWithTreatmentDetails = await window.electron.PatientApi.get({
				patientId: value.id,
			});
			dispatch(resetSelectedPatientDataFields({}));
			dispatch(
				setSelectedPatientProfileDetails({ patientProfileDetails: value })
			);
			dispatch(
				setSelectedPatientConsultationDetails({
					patientConsultationDetails: patientWithTreatmentDetails.data,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<React.Fragment>
			<Container>
				<Box>
					<Grid
						container
						direction={"row"}
						spacing={3}
						justifyContent={"flex-start"}
						alignItems={"center"}
					>
						<Grid item>
							<AsyncSearchBar
								label={"Search..."}
								handleChange={handleChangeSearch}
								valuesFromSearch={patients}
								selectionOnChange={handleSelectedPatientChange}
							/>
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								sx={{ height: "50px", alignContent: "center" }}
								onClick={handleClickAddPatient}
							>
								<p>Add patient </p> &nbsp;
								<AddIcon />
							</Button>
						</Grid>
					</Grid>
					<PatientInfo />
				</Box>
			</Container>
			<AddNewPatient />
		</React.Fragment>
	);
};

export default Patients;
