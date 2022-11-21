import { Box, Button, Dialog, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AsyncSearchBar from "../../../../components/AsyncSearchBar";
import AddIcon from "@mui/icons-material/Add";
import AddNewPatientInputModal from "../../../../components/AddNewPatientModal";
import AddNewPatient from "./AddNewPatient";
import {
	setAddNewConsultationInputDialogState,
	setAddNewPatientInputDialogState,
	setAddNewPatientMode,
	setDeletePatientConfirmationState,
	setEditPatientInputDialogState,
	setSnackBarState,
} from "../../../../redux/Reducers/utilDataReducer";
import PatientInfo from "./PatientInfo";
import {
	migrateSelectedPatientToEditPatient,
	resetSelectedPatientDataFields,
	setSelectedPatientConsultationDetails,
	setSelectedPatientProfileDetails,
} from "../../../../redux/Reducers/appStateDataReducer";
import { IStore } from "../../../../helpers/interfaces";
import AlertDialog from "../../../../components/Dialog";
import EditPatient from "./EditPatient";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;
enum Actions {
	close,
	open,
}

const Patients = () => {
	const [patients, setPatients] = useState<any>([]);
	let patientId = useSelector(
		(state: IStore) =>
			state.applicationDataStore.selectedPatient.patientProfileDetails.id
	);
	let addConsultationConfirmationIsOpen = useSelector(
		(state: IStore) =>
			state.utilDataStore.data.addNewConsultationInputDialogOpen
	);
	let deletePatientConfirmationIsOpen = useSelector(
		(state: IStore) =>
			state.utilDataStore.data.deletePatientConfirmationDialogOpen
	);
	let { selected } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatient
	);
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
	const handleClickEditPatient = () => {
		try {
			dispatch(migrateSelectedPatientToEditPatient({}));
			dispatch(setEditPatientInputDialogState(true));
		} catch (err) {
			console.log(err);
		}
	};
	async function getNamesOfFiles() {
		try {
			let files = await window.electron.DebugApi.get({});
			console.log(
				"🚀 ~ file: index.tsx ~ line 75 ~ getNamesOfFiles ~ files",
				files
			);
		} catch (err) {
			console.log(err);
		}
	}
	useEffect(() => {
		getNamesOfFiles();
	}, []);
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

	const handleClickAddConsultation = async (): Promise<any> => {
		try {
			if (patientId) {
				let newConsultation = await window.electron.TreatmentDetailsApi.post({
					patientId: patientId,
				});
				let patientWithTreatmentDetails = await window.electron.PatientApi.get({
					patientId: patientId,
				});
				dispatch(
					setSelectedPatientConsultationDetails({
						patientConsultationDetails: patientWithTreatmentDetails.data,
					})
				);

				if (newConsultation.status == 200) {
					dispatch(
						setAddNewConsultationInputDialogState({
							addNewConsultationInputDialogOpen: false,
						})
					);
					dispatch(
						setSnackBarState({
							snackBarOpen: true,
							text: "Added new Consultation",
						})
					);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleClickDeletePatient = async (): Promise<any> => {
		try {
			if (patientId) {
				let deletePatient = await window.electron.PatientApi.delete({
					id: patientId,
				});
				if (deletePatient.status == 200) {
					dispatch(setDeletePatientConfirmationState(false));
					dispatch(
						setSnackBarState({
							snackBarOpen: true,
							text: "Deleted Patient",
						})
					);
					handleDeletedPatientChange();
				}
			}
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
	const handleDeletedPatientChange = (): void => {
		try {
			dispatch(resetSelectedPatientDataFields({}));
		} catch (err) {
			console.log(err);
		}
	};

	const handleInputDialogState = async (action: string): Promise<any> => {
		try {
			if (action === "open") {
				dispatch(
					setAddNewConsultationInputDialogState({
						addNewConsultationInputDialogOpen: true,
					})
				);
			} else if (action === "close") {
				dispatch(
					setAddNewConsultationInputDialogState({
						addNewConsultationInputDialogOpen: false,
					})
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleClickOpenDeleteConfirmation = async (
		action: string
	): Promise<any> => {
		try {
			if (action === "open") {
				dispatch(setDeletePatientConfirmationState(true));
			} else if (action === "close") {
				dispatch(setDeletePatientConfirmationState(false));
			}
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
						{selected ? (
							<Grid item>
								<Button
									variant="outlined"
									sx={{ height: "50px", alignContent: "center" }}
									onClick={() => handleInputDialogState("open")}
								>
									<p>Add Consultation </p> &nbsp;
									<AddIcon />
								</Button>
							</Grid>
						) : (
							<React.Fragment />
						)}
						{selected ? (
							<Grid item>
								<Button
									variant="outlined"
									color="success"
									sx={{ height: "50px", alignContent: "center" }}
									onClick={() => handleClickEditPatient()}
								>
									<p>Edit Patient </p> &nbsp;
									<AddIcon />
								</Button>
							</Grid>
						) : (
							<React.Fragment />
						)}
						{selected ? (
							<Grid item>
								<Button
									variant="outlined"
									color="error"
									sx={{ height: "50px", alignContent: "center" }}
									onClick={() => handleClickOpenDeleteConfirmation("open")}
								>
									<p>Delete Patient </p> &nbsp;
									<AddIcon />
								</Button>
							</Grid>
						) : (
							<React.Fragment />
						)}
					</Grid>
					<PatientInfo />
				</Box>
			</Container>
			<AddNewPatient />
			<EditPatient />
			<AlertDialog
				action={handleClickAddConsultation}
				close={() => handleInputDialogState("close")}
				isOpen={addConsultationConfirmationIsOpen}
				text={"Confirm to create a new Consultation ?"}
			/>
			<AlertDialog
				action={handleClickDeletePatient}
				close={() => handleClickOpenDeleteConfirmation("close")}
				isOpen={deletePatientConfirmationIsOpen}
				text={"Confirm to create a new Consultation ?"}
			/>
		</React.Fragment>
	);
};

export default Patients;
