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

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const PatientInfo = () => {
	const [patients, setPatients] = useState<any>([]);
	let dispatch = useDispatch();

	let patientSelected = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatient.selected
	);
	let patientConsultations = useSelector(
		(state: IStore) =>
			state.applicationDataStore.selectedPatient.patientConsultationDetails
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
			field: "",
			headerName: "Redirect",
			description: "Button to redirect to the consultation details",
			type: "string",
			sortable: false,
			width: 100,
			editable: true,
			renderCell: (params: any) => (
				<Button sx={{ mx: "auto" }}>
					<CallMadeIcon />
				</Button>
			),
		},
	];
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
