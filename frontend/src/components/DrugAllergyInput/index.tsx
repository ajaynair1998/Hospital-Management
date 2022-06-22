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
	Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	setChiefComplaints,
	setClinicalDiagnosis,
	setDiagnosis,
	setDrugAllergies,
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
import SelectionArray from "../SelectionArray";
import SelectedArray from "../SelectedArray";
import FavouritesHook from "../../hooks/favourites";

const DrugAllergyInput = () => {
	const dispatch = useDispatch();
	let { data } = useSelector((state: IStore) => state.categoriesStore);

	let location = data.location;
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [allergy, setAllergy] = useState("");
	let [details, setDetails] = useState("");
	let [selectedItems, setSelectedItems] = useState<string[]>([]);

	FavouritesHook();
	let favourites = useSelector(
		(state: IStore) => state.favouritesDataStore.data
	);
	// favourites = favourites.map((item: any) => item.data);
	const handleAdd = async () => {
		try {
			// check whether this exists in the favourites , if not
			// add it into the facourites data

			let addedToFavourites = await window.electron.favouritesApi.post({
				category: location,
				data: allergy,
			});

			let { data } = await getFavourites(location);
			const response = await window.electron.DrugAllergyApi.post({
				treatmentDetailId: treatmentDetailId,
				details: details,
				allergy: allergy,
			});

			let allAllergies = await window.electron.DrugAllergyApi.get({
				treatmentDetailId: 1,
			});
			console.log(allAllergies);

			dispatch(setDrugAllergies(allAllergies.data));
			dispatch(setFavourites(data));
			setAllergy("");
			setDetails("");

			if (response.status === 200) {
				dispatch(setSnackBarState({ snackBarOpen: true, text: "Success" }));
				dispatch(setInputDialogState({ inputDialogOpen: false }));
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const handleAddnewDrugAllergy = async () => {
		let addedToFavourites = await window.electron.favouritesApi.post({
			category: location,
			data: allergy,
		});
		console.log(
			"🚀 ~ file: index.tsx ~ line 90 ~ handleAddnewDrugAllergy ~ addedToFavourites",
			addedToFavourites
		);
		selectedItems.push(allergy);

		setAllergy("");
		let { data } = await getFavourites(location);

		dispatch(setFavourites(data));
	};

	const addTheSelectedDrugAllergies = async () => {
		let addedDrugAllergies = await window.electron.DrugAllergyApi.post({
			allergies: selectedItems,
		});
		console.log(
			"🚀 ~ file: index.tsx ~ line 106 ~ addTheSelectedDrugAllergies ~ addedDrugAllergies",
			addedDrugAllergies
		);
		let allAllergies = await window.electron.DrugAllergyApi.get({
			treatmentDetailId: 1,
		});
		console.log(allAllergies);

		dispatch(setDrugAllergies(allAllergies.data));
		dispatch(setFavourites(data));
		setAllergy("");
		setDetails("");

		if (addedDrugAllergies.status === 200) {
			dispatch(setSnackBarState({ snackBarOpen: true, text: "Success" }));
			dispatch(setInputDialogState({ inputDialogOpen: false }));
		}
	};

	async function handleFavouriteDelete(id: string) {
		console.log(
			"🚀 ~ file: index.tsx ~ line 103 ~ handleFavouriteDelete ~ id",
			id
		);
		try {
			let deleteFavourite = await window.electron.favouritesApi.delete({
				id: id,
			});
			console.log(
				"🚀 ~ file: index.tsx ~ line 104 ~ handleFavouriteDelete ~ deleteFavourite",
				deleteFavourite
			);
			let { data } = await getFavourites(location);
			dispatch(setFavourites(data));
		} catch (err: any) {}
	}
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
			<SelectionArray
				items={favourites}
				returnSelectedItems={setSelectedItems}
				deleteAction={(favouriteId: string) =>
					handleFavouriteDelete(favouriteId)
				}
			/>
			<Grid container spacing={2} alignItems={"center"}>
				<Grid item xs={10}>
					<TextField
						id="outlined-basic"
						label="Drug allergy"
						variant="outlined"
						value={allergy}
						sx={{ width: "100%" }}
						onChange={(e) => setAllergy(e.target.value)}
					/>
				</Grid>

				<Grid item xs={2}>
					<Button
						variant="contained"
						onClick={() => handleAddnewDrugAllergy()}
						sx={{ width: "100%" }}
					>
						Add
					</Button>
				</Grid>
			</Grid>

			{/* <TextField
				id="outlined-multiline-static"
				label="Details"
				multiline
				rows={4}
				value={details}
				// sx={{ width: "300px!important" }}
				onChange={(e) => setDetails(e.target.value)}
			/> */}
			<SelectedArray items={selectedItems} />

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
						onClick={() => addTheSelectedDrugAllergies()}
					>
						Save
					</Button>
				</Box>
			</AppBar>
		</Box>
	);
};

export default DrugAllergyInput;
