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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	setChiefComplaints,
	setClinicalDiagnosis,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { IStore } from "../../helpers/interfaces";
import {
	setSelectedInputValue,
	setSnackBarState,
} from "../../redux/Reducers/utilDataReducer";
import { getFavourites, timeout } from "../../helpers/functions";
import { setFavourites } from "../../redux/Reducers/favouritesDataReducer";
import { setTimeout } from "timers/promises";

const ClinicalDiagnosisInput = () => {
	const dispatch = useDispatch();
	let { data } = useSelector((state: IStore) => state.categoriesStore);
	let location = data.location;
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [diagnosis, setDiagnosis] = useState("");
	let [details, setDetails] = useState("");

	let { inputValue } = useSelector((state: IStore) => state.utilDataStore.data);

	useEffect(() => {
		setDiagnosis(inputValue);
	}, [inputValue]);

	const handleInputValueChange = (value: string) => {
		dispatch(setSelectedInputValue(value));
	};

	const handleAdd = async () => {
		try {
			// check whether this exists in the favourites , if not
			// add it into the facourites data

			let addedToFavourites = await window.electron.favouritesApi.post({
				category: location,
				data: diagnosis,
			});

			let { data } = await getFavourites(location);
			const response = await window.electron.ClinicalDiagnosisApi.post({
				treatmentDetailId: treatmentDetailId,
				details: details,
				diagnosis: diagnosis,
			});

			let allDiagnosis = await window.electron.ClinicalDiagnosisApi.get({
				treatmentDetailId: 1,
			});
			console.log(allDiagnosis);

			dispatch(setClinicalDiagnosis(allDiagnosis.data));
			dispatch(setFavourites(data));
			setDiagnosis("");
			setDetails("");

			if (response.status === 200) {
				dispatch(setSnackBarState({ snackBarOpen: true, text: "Success" }));
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};
	return (
		<Box
			component="form"
			sx={{
				"& > :not(style)": { m: 2, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
			display={"flex"}
			flexDirection={"column"}
		>
			<TextField
				id="outlined-basic"
				label="Clinical Diagnosis"
				variant="outlined"
				value={diagnosis}
				sx={{ width: "200px!important" }}
				onChange={(e) => handleInputValueChange(e.target.value)}
			/>

			<TextField
				id="outlined-multiline-static"
				label="Details"
				multiline
				rows={4}
				value={details}
				sx={{ width: "300px!important" }}
				onChange={(e) => setDetails(e.target.value)}
			/>

			<Button
				variant="contained"
				sx={{
					width: "80px!important",
				}}
				onClick={() => handleAdd()}
			>
				Add
			</Button>
		</Box>
	);
};

export default ClinicalDiagnosisInput;
