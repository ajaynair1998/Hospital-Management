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
	setHistoryOfComplaints,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { IStore } from "../../helpers/interfaces";
import {
	setInputDialogState,
	setSelectedInputValue,
	setSnackBarState,
} from "../../redux/Reducers/utilDataReducer";
import { getFavourites, timeout } from "../../helpers/functions";
import { setFavourites } from "../../redux/Reducers/favouritesDataReducer";
import { setTimeout } from "timers/promises";

const HistoryOfComplaintsInput = () => {
	const dispatch = useDispatch();
	let { data } = useSelector((state: IStore) => state.categoriesStore);
	let location = data.location;
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [complaint, setComplaint] = useState("");
	let [details, setDetails] = useState("");

	let { inputValue } = useSelector((state: IStore) => state.utilDataStore.data);

	useEffect(() => {
		setComplaint(inputValue);
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
				data: complaint,
			});

			let { data } = await getFavourites(location);
			const response = await window.electron.HistoryOfComplaintsApi.post({
				treatmentDetailId: treatmentDetailId,
				details: details,
				complaint: complaint,
			});

			let allComplaints = await window.electron.HistoryOfComplaintsApi.get({
				treatmentDetailId: 1,
			});
			console.log(allComplaints);

			dispatch(setHistoryOfComplaints(allComplaints.data));
			dispatch(setFavourites(data));
			setComplaint("");
			setDetails("");

			if (response.status === 200) {
				dispatch(setSnackBarState({ snackBarOpen: true, text: "Success" }));
				dispatch(setInputDialogState({ inputDialogOpen: false }));
			}
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
			<TextField
				id="outlined-basic"
				label="Complaint"
				variant="outlined"
				value={complaint}
				// sx={{ width: "200px!important" }}
				onChange={(e) => handleInputValueChange(e.target.value)}
			/>

			<TextField
				id="outlined-multiline-static"
				label="Details"
				multiline
				rows={4}
				value={details}
				// sx={{ width: "300px!important" }}
				onChange={(e) => setDetails(e.target.value)}
			/>

			{/* <Button
				variant="contained"
				sx={{
					width: "80px!important",
				}}
				onClick={() => handleAdd()}
			>
				Add
			</Button> */}
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

export default HistoryOfComplaintsInput;