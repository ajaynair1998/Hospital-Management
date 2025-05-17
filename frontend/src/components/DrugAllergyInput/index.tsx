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
import SelectionArray from "../SelectionArray";
import SelectedArray from "../SelectedArray";
import FavouritesHook from "../../hooks/favourites";
export interface ISelectedItems {
	[key: string]: {
		name: string;
		selected: boolean;
		id?: string;
	};
}

interface IfavouritesForSelectionArray extends ISelectedItems {}

const DrugAllergyInput = () => {
	const dispatch = useDispatch();
	let { data } = useSelector((state: IStore) => state.categoriesStore);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);

	let location = data.location;
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [allergy, setAllergy] = useState("");
	let [details, setDetails] = useState("");
	let [selectedItems, setSelectedItems] = useState<ISelectedItems>({});
	let [toggleClear, setToggleClear] = useState<boolean>(false);

	FavouritesHook();
	let favourites = useSelector(
		(state: IStore) => state.favouritesDataStore.data
	);

	useEffect(() => {
		initializeSelectedItems();
	}, []);
	const initializeSelectedItems = async () => {
		let currentFavourites = await getFavourites(location);
		dispatch(setFavourites(currentFavourites.data));

		let favouriteItemsNonSelected: IfavouritesForSelectionArray = {};
		currentFavourites?.data?.forEach((item: any) => {
			favouriteItemsNonSelected[item.data] = {
				name: item.data,
				selected: false,
				id: item.id,
			};
		});
		setSelectedItems(favouriteItemsNonSelected);
	};

	const handleAddnewDrugAllergy = async () => {
		let addedToFavourites = await window.electron.favouritesApi.post({
			category: location,
			data: allergy,
		});

		if (addedToFavourites.status === 500) {
			let currentSelectedItems = { ...selectedItems };
			currentSelectedItems[allergy] = {
				...currentSelectedItems[allergy],
				selected: true,
			};
			setSelectedItems(currentSelectedItems);
		} else {
			let currentSelectedItems = { ...selectedItems };
			currentSelectedItems[allergy] = {
				name: allergy,
				selected: true,
			};
			setSelectedItems(currentSelectedItems);
		}

		setAllergy("");
	};

	async function handleFavouriteDelete(id: string, name: string) {
		try {
			let deleteFavourite = await window.electron.favouritesApi.delete({
				id: id,
			});
			if (deleteFavourite.status === 200) {
				let currentSelectedItems = { ...selectedItems };
				delete currentSelectedItems[name];
				setSelectedItems(currentSelectedItems);
			} else {
				console.log("Error Couldnt delete the favourite ");
			}
		} catch (err: any) {}
	}

	async function addTheSelectedDrugAllergies() {
		try {
			let allergies = Object.values(selectedItems).filter((item: any) =>
				item.selected ? true : false
			);
			let listOfAllergies = allergies.map((item) => item.name);
			const response = await window.electron.DrugAllergyApi.post({
				treatmentDetailId: patientTreatmentDetailId,
				allergies: listOfAllergies,
			});

			let allAllergies = await window.electron.DrugAllergyApi.get({
				treatmentDetailId: patientTreatmentDetailId,
				multiple: multiple ? multiple : false,
				patientId: patientId,
			});

			dispatch(setDrugAllergies(allAllergies.data));

			setAllergy("");
			let { data } = await getFavourites(location);
			dispatch(setFavourites(data));

			if (response.status === 200) {
				dispatch(setSnackBarState({ snackBarOpen: true, text: "Success" }));
				dispatch(setInputDialogState({ inputDialogOpen: false }));
			}
		} catch (err) {
			console.log(err);
		}
	}

	function removeTheSelectedDrugAllergy(id: string) {
		try {
			let currentSelectedItems = { ...selectedItems };
			currentSelectedItems[id] = {
				...currentSelectedItems[id],
				selected: false,
			};
			setSelectedItems(currentSelectedItems);
		} catch (err) {
			console.log(err);
		}
	}

	function addTheFavouriteToTheDrugAllergy(id: string) {
		try {
			let currentSelectedItems = { ...selectedItems };
			currentSelectedItems[id] = {
				...currentSelectedItems[id],
				selected: true,
			};
			setSelectedItems(currentSelectedItems);
		} catch (err) {
			console.log(err);
		}
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
				items={selectedItems}
				deleteAction={handleFavouriteDelete}
				selectAction={addTheFavouriteToTheDrugAllergy}
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
			<SelectedArray
				items={selectedItems}
				deleteAction={removeTheSelectedDrugAllergy}
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
						onClick={() => addTheSelectedDrugAllergies()}
					>
						Save
					</Button>
					<Button
						variant="outlined"
						sx={{
							width: "120px!important",
							mr: "0",
						}}
						onClick={() => initializeSelectedItems()}
					>
						Reset
					</Button>
				</Box>
			</AppBar>
		</Box>
	);
};

export default DrugAllergyInput;
