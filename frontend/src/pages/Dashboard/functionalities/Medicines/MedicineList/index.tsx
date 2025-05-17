import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import DataGridComponant from "../../../../../components/DataGrid";
import { IMedicine, IStore } from "../../../../../helpers/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import CallMadeIcon from "@mui/icons-material/CallMade";
import {
	convertDbTimeToReadableString,
	generateMaximumLengthString,
} from "../../../../../helpers";
import {
	setMedicines,
	setSelectedPatientConsultation,
	setSelectedPatientConsultationDetails,
} from "../../../../../redux/reducers/appStateDataReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import Medicines from "..";
import AlertDialog from "../../../../../components/Dialog";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const MedicineList = () => {
	let dispatch = useDispatch();

	const [medicineId, setMedicineId] = useState<number>(
		null as unknown as number
	);
	const [medicineName, setMedicineName] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);
	const medicines = useSelector(
		(state: IStore) => state.applicationDataStore.medicines
	);

	useEffect(() => {
		getAllMedicines();
	}, []);

	const getAllMedicines = async () => {
		try {
			let medicines = await window.electron.MedicineApi.get({});

			dispatch(setMedicines({ medicines: medicines.data }));
		} catch (err) {
			console.log(err);
		}
	};

	const handleClickDeleteMedicine = async () => {
		try {
			await window.electron.MedicineApi.delete({ id: medicineId });
			let medicines = await window.electron.MedicineApi.get({});

			dispatch(setMedicines({ medicines: medicines.data }));
			setOpen(false);
		} catch (err) {
			console.log(err);
		}
	};
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90, sortable: true },
		{
			field: "name",
			headerName: "Medicine name",
			width: 200,
			editable: true,
		},
		{
			field: "strength",
			headerName: "Strength",
			width: 150,
			editable: true,
		},
		{
			field: "medicine_form",
			headerName: "Medicine form",
			type: "string",
			width: 150,
			editable: true,
		},
		{
			field: "description",
			headerName: "Description",
			type: "string",

			width: 200,
			editable: true,
			renderCell: (params: any) => {
				return generateMaximumLengthString(params.value, 18);
			},
		},
		{
			field: "createdAt",
			headerName: "Created at",
			type: "string",
			description: "The time when this medicine was created",
			width: 250,
			editable: true,
			sortable: false,
			renderCell: (params: any) => {
				return convertDbTimeToReadableString(params.value);
			},
		},

		{
			field: "delete",
			headerName: "Delete",
			description: "Button to delete the Medicine",
			type: "string",
			sortable: false,
			width: 100,
			editable: true,
			renderCell: (params: any) => (
				<Button
					sx={{ mx: "auto" }}
					onClick={() => {
						setMedicineId(params.id);
						setOpen(true);
					}}
				>
					<DeleteIcon
						onClick={() => {
							setMedicineId(params.id);
							setOpen(true);
						}}
					/>
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
						<Grid item xs={12}>
							<DataGridComponant
								height={700}
								rows={medicines}
								columns={columns}
							/>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<AlertDialog
				action={handleClickDeleteMedicine}
				isOpen={open}
				text={`Do you want to remove ${medicineName} ?`}
				close={() => setOpen(false)}
			/>
		</React.Fragment>
	);
};

export default MedicineList;
