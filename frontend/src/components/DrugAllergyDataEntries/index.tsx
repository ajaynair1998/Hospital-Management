import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	IClinicalDiagnosis,
	IDrugAllergy,
	IHistoryOfComplaint,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setClinicalDiagnosis,
	setDrugAllergies,
	setHistoryOfComplaints,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import BasicAccordion from "../BasicAccordion";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	allergy: string;
	details: string;
	duration?: string;
	id: number;
	handleSelectDrugAllergy: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedDrugAllergyText: React.Dispatch<React.SetStateAction<string>>;
}

export const DrugAllergyDataEntries = () => {
	const [selectedDrugAllergy, setSelectedDrugAllergy] = React.useState(null);
	const [selectDrugAllergyText, setSelectedDrugAllergyText] =
		React.useState("");
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const drug_allergies = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.drug_allergies
	);
	let dispatch = useDispatch();
	const fetchAllExistingDrugAllergies = async () => {
		let response = await window.electron.DrugAllergyApi.get({
			treatmentDetailId: 1,
		});
		if (response.status === 200) {
			dispatch(setDrugAllergies(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.DrugAllergyApi.delete({
				id: selectedDrugAllergy,
			});
			setDialogOpen(false);
			await fetchAllExistingDrugAllergies();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingDrugAllergies();
	}, []);
	return (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="h5" component="div">
							Data Entries
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box m={2}>
				{drug_allergies &&
					drug_allergies.map((item: IDrugAllergy) => {
						return (
							<DrugAllergyDataEntry
								createdAt={item.createdAt}
								allergy={item.allergy}
								details={item.details}
								id={item.id}
								key={item.id}
								handleSelectDrugAllergy={setSelectedDrugAllergy}
								openDialog={setDialogOpen}
								setSelectedDrugAllergyText={setSelectedDrugAllergyText}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove ${selectDrugAllergyText} ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	);
};

export default function DrugAllergyDataEntry({
	createdAt,
	allergy,
	details,
	duration,
	id,
	handleSelectDrugAllergy,
	openDialog,
	setSelectedDrugAllergyText,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [drugAllergy, setDrugAllergy] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setDrugAllergy(allergy);
		setDetail(details);
	}, []);

	const handleRemoveButton = async () => {
		try {
			handleSelectDrugAllergy(id);
			setSelectedDrugAllergyText(allergy);
			openDialog(true);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	return (
		// <Paper
		// 	key={id}
		// 	elevation={2}
		// 	sx={{
		// 		p: 2,
		// 		mb: 2,

		// 		// margin: 2,
		// 		// maxWidth: 500,
		// 		flexGrow: 1,
		// 		backgroundColor: (theme) =>
		// 			theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		// 	}}
		// >
		// 	<Grid container spacing={2}>
		// 		{/* <Grid item>
		//   <ButtonBase sx={{ width: 128, height: 128 }}>
		//     <Img alt="complex" src="/static/images/grid/complex.jpg" />
		//   </ButtonBase>
		// </Grid> */}
		// 		<Grid item xs={12} sm container>
		// 			<Grid item xs container direction="column" spacing={2}>
		// 				<Grid item xs sx={{ m: 1 }}>
		// 					<Typography gutterBottom variant="subtitle1" component="div">
		// 						{allergy}
		// 					</Typography>
		// 					<Typography variant="body2" gutterBottom>
		// 						{detailValue}
		// 					</Typography>
		// 				</Grid>
		// 				<Grid item xs container direction="row" spacing={2}>
		// 					<Grid item>
		// 						<Button sx={{ color: "#ea2929" }} onClick={handleRemoveButton}>
		// 							Remove
		// 						</Button>
		// 					</Grid>
		// 					<Grid item>
		// 						<Button>Edit</Button>
		// 					</Grid>
		// 				</Grid>
		// 			</Grid>
		// 			<Grid item>
		// 				<Typography variant="subtitle1" component="div" sx={{ m: 1 }}>
		// 					{created_at_readable_format}
		// 				</Typography>
		// 			</Grid>
		// 		</Grid>
		// 	</Grid>
		// </Paper>
		<BasicAccordion
			heading={allergy}
			handleDelete={handleRemoveButton}
			id={id}
			details={details}
		/>
	);
}
