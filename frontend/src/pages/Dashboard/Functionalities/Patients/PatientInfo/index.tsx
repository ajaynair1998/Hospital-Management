import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import PatientProfileCard from "./PatientProfileCard";
import DataGridComponant from "../../../../../components/DataGrid";
import { IStore } from "../../../../../helpers/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { convertDbTimeToReadableString } from "../../../../../helpers";
import {
	setSelectedPatientConsultation,
	setSelectedPatientConsultationDetails,
} from "../../../../../redux/Reducers/appStateDataReducer";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const PatientInfo = () => {
	const navigate = useNavigate();
	const [patients, setPatients] = useState<any>([]);
	let dispatch = useDispatch();

	let patientSelected = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatient.selected
	);
	let patientConsultations = useSelector(
		(state: IStore) =>
			state.applicationDataStore.selectedPatient.patientConsultationDetails
	);
	let patientId = useSelector(
		(state: IStore) =>
			state.applicationDataStore.selectedPatient.patientProfileDetails.id
	);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90, sortable: true },
		// {
		// 	field: "patientId",
		// 	headerName: "Patient Id",
		// 	width: 100,
		// 	editable: true,
		// },
		// {
		// 	field: "id",
		// 	headerName: "Consultation id",
		// 	width: 150,
		// 	editable: true,
		// },
		{
			field: "createdAt",
			headerName: "Created at",
			type: "string",
			description: "The time when this consultation was created",
			width: 250,
			editable: true,
			sortable: false,
			renderCell: (params: any) => {
				return convertDbTimeToReadableString(params.value);
			},
		},
		{
			field: "updatedAt",
			headerName: "Updated at",
			type: "string",
			description: "the time when this consultation was updated",
			sortable: false,
			width: 250,
			renderCell: (params: any) => {
				return convertDbTimeToReadableString(params.value);
			},
		},
		{
			field: "edit",
			headerName: "Edit",
			description: "Button to redirect to the consultation details",
			type: "string",
			sortable: false,
			width: 100,
			editable: true,
			renderCell: (params: any) => (
				<Button
					sx={{ mx: "auto" }}
					onClick={() => handleClickGoToConsultation(params.id)}
				>
					<CallMadeIcon
						onClick={() => handleClickGoToConsultation(params.id)}
					/>
				</Button>
			),
		},
		{
			field: "delete",
			headerName: "Delete",
			description: "Button to delete the consultation",
			type: "string",
			sortable: false,
			width: 100,
			editable: true,
			renderCell: (params: any) => (
				<Button
					sx={{ mx: "auto" }}
					onClick={() => handleClickDeleteConsultation(params.id)}
				>
					<DeleteIcon
						onClick={() => handleClickDeleteConsultation(params.id)}
					/>
				</Button>
			),
		},
	];

	const handleClickGoToConsultation = (id: number): void => {
		try {
			dispatch(
				setSelectedPatientConsultation({
					id: id,
				})
			);
			navigate("/patient-treatment-details", { replace: true });
		} catch (err) {
			console.log(err);
		}
	};

	const handleClickDeleteConsultation = async (id: number): Promise<any> => {
		try {
			await window.electron.TreatmentDetailsApi.delete({
				id: id,
			});
			let patientWithTreatmentDetails = await window.electron.PatientApi.get({
				patientId: patientId,
			});
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
				<Box sx={{ mt: 1 }}>
					<Grid
						container
						direction={"row"}
						spacing={2}
						justifyContent={"flex-start"}
						alignItems={"start"}
						className="Patient Profile Card And Data Grid"
					>
						<Grid item xs={12} md={4}>
							<PatientProfileCard />
						</Grid>
						<Grid item xs={12} md={8}>
							{patientSelected && patientConsultations ? (
								<DataGridComponant
									height={600}
									rows={patientConsultations}
									columns={columns}
								/>
							) : (
								<React.Fragment />
							)}
						</Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default PatientInfo;
