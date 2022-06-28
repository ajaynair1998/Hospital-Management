import React, { useState, useEffect } from "react";
import {
	Box,
	TextField,
	Button,
	AppBar,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	setDiagnosis,
	setFollowUps,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { IStore } from "../../helpers/interfaces";
import {
	setInputDialogState,
	setSelectedInputValue,
	setSnackBarState,
} from "../../redux/Reducers/utilDataReducer";

import DateInput from "../DateInput";

const FollowUpInput = () => {
	const dispatch = useDispatch();
	let { data } = useSelector((state: IStore) => state.categoriesStore);
	let location = data.location;
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [details, setDetails] = useState("");
	const [purpose, setPurpose] = useState("revisit");
	const [date, setDate] = React.useState<Date | null>(new Date());

	let { inputValue } = useSelector((state: IStore) => state.utilDataStore.data);

	const handleDateChange = (newValue: Date | null) => {
		setDate(newValue);
	};

	let handleChangeType = (e: any) => {
		setPurpose(e.target.value);
	};
	const handleAdd = async () => {
		try {
			// check whether this exists in the favourites , if not
			// add it into the facourites data

			const response = await window.electron.FollowUpApi.post({
				treatmentDetailId: treatmentDetailId,
				follow_up_text: details,
				follow_up_date: date,
				purpose: purpose,
			});

			let allFollowups = await window.electron.FollowUpApi.get({
				treatmentDetailId: 1,
			});
			console.log(allFollowups);

			dispatch(setFollowUps(allFollowups.data));
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
			<FormControl>
				<InputLabel id="demo-simple-select-label"> Purpose</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={purpose}
					label="Purpose"
					onChange={(e) => handleChangeType(e)}
				>
					<MenuItem value={"revisit"}>Revisit</MenuItem>
					<MenuItem value={"consultation"}>Consultation</MenuItem>
					<MenuItem value={"others"}>Others</MenuItem>
				</Select>
			</FormControl>
			<DateInput handleChange={setDate} value={date} />

			<TextField
				id="outlined-multiline-static"
				label="Detail about the follow up"
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

export default FollowUpInput;
