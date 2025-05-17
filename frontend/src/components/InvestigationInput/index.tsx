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
	AppBar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	setChiefComplaints,
	setClinicalDiagnosis,
	setDiagnosis,
	setInvestigation,
} from "../../redux/reducers/patientTreatmentDetailsReducer";
import { IStore } from "../../helpers/interfaces";
import {
	setInputDialogState,
	setSelectedInputValue,
	setSnackBarState,
} from "../../redux/reducers/utilDataReducer";
import { getFavourites, timeout } from "../../helpers/functions";
import { setFavourites } from "../../redux/reducers/favouritesDataReducer";
import { setTimeout } from "timers/promises";
import FilePickerComponent from "../FilePicker";

export interface IFile {
	file_name?: string;
	file_size?: number;
	file_type?: string;
	file_data?: string;
}

const InvestigationInput = () => {
	const dispatch = useDispatch();
	let { data } = useSelector((state: IStore) => state.categoriesStore);
	let location = data.location;
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [file, setFile] = useState<IFile>({});

	const handleFileChange = (file: IFile) => {
		let { file_name, file_size, file_type, file_data } = file;
		setFile({
			file_name,
			file_size,
			file_type,
			file_data,
		});
	};
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	useEffect(() => {}, [file]);
	const fetchAllExistingInvestigations = async () => {
		let response = await window.electron.InvestigationApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		if (response.status === 200) {
			dispatch(setInvestigation(response.data));
		}
	};

	const handleAdd = async () => {
		try {
			let { file_name, file_size, file_type, file_data } = file;
			let { data } = await getFavourites(location);
			const response = await window.electron.InvestigationApi.post({
				treatmentDetailId: patientTreatmentDetailId,
				file_data,
				file_name,
				file_size,
				file_type,
			});
			await fetchAllExistingInvestigations();
			setFile({});

			dispatch(setFavourites(data));
		} catch (err: any) {
			console.log(err.message);
		}
	};
	return (
		<Box
			component="form"
			sx={{
				"& > :not(style)": { m: 2, width: "90%" },
			}}
			noValidate
			autoComplete="off"
			display={"flex"}
			flexDirection={"column"}
		>
			<FilePickerComponent
				handleChange={handleFileChange}
				fileName={file.file_name}
			/>

			<AppBar
				elevation={0}
				sx={{
					position: "sticky",
					bottom: "0",
					zIndex: 150,
					backgroundColor: "#ffffff",
					// m: 0,
					my: "0!important",
					height: "50px",
					width: "100%",
					borderWidth: 0,
					p: "0!important",
				}}
			>
				<Box
					width="100%"
					sx={{
						flexDirection: "row-reverse",
						alignContent: "center",
						display: "flex",
						alignItems: "center",
						margin: "auto",
						gap: "20px",
						// pr: 2,
					}}
				>
					<Button
						variant="outlined"
						sx={{
							width: "120px!important",
							mr: "0",
						}}
						onClick={() => handleAdd()}
					>
						Save
					</Button>
				</Box>
			</AppBar>
		</Box>
	);
};

export default InvestigationInput;
