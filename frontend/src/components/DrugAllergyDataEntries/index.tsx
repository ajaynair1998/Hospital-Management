import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	IDrugAllergy,
	IPastMedicalHistory,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint, ITreatmentPlan } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setDrugAllergies,
	setPastMedicalHistory,
	setTreatmentPlan,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import SelectedArray from "../SelectedArray";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	allergies: string[];
	id?: number;
	handleSelectDrugAllergy: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrugAllergyDataEntries = () => {
	const [selectedAllergy, setSelectedAllergy] = React.useState(null);
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const drug_allergies = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.drug_allergies
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let dispatch = useDispatch();
	const fetchAllExistingDrugAllergies = async () => {
		let response = await window.electron.DrugAllergyApi.get({
			treatmentDetailId: patientTreatmentDetailId,
		});
		if (response.status === 200) {
			dispatch(setDrugAllergies(response.data));
		}
	};
	let handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.DrugAllergyApi.delete({
				id: selectedAllergy,
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
								allergies={item.allergy}
								id={item.id}
								key={item.id}
								handleSelectDrugAllergy={setSelectedAllergy}
								openDialog={setDialogOpen}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove these allergies ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	);
};

export function DrugAllergyDataEntry({
	createdAt,
	allergies,
	id,
	handleSelectDrugAllergy,
	openDialog,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [drugAllergy, setDrugAllergy] = React.useState<any>("");
	const [durationValue, setDuration] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setDrugAllergy(allergies);
	}, []);

	let handleRemoveButton = async () => {
		try {
			handleSelectDrugAllergy(id);
			openDialog(true);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	return (
		<Paper
			key={id}
			elevation={2}
			sx={{
				p: 2,
				mb: 2,

				// margin: 2,
				// maxWidth: 500,
				flexGrow: 1,
				backgroundColor: (theme) =>
					theme.palette.mode === "dark" ? "#1A2027" : "#fff",
			}}
		>
			<Grid container spacing={2}>
				{/* <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid> */}
				<Grid item xs={12} sm container>
					<Grid item xs container direction="column" spacing={2}>
						<Grid
							item
							xs
							sx={{
								m: 0,
							}}
						>
							<Typography
								gutterBottom
								variant="subtitle1"
								component="div"
								sx={{ color: "#fff" }}
							>
								{allergies}
							</Typography>
							<Typography variant="body2" color="text.secondary" gutterBottom>
								{durationValue}
							</Typography>
							{/* <Typography variant="body2" gutterBottom>
								{detailValue}
							</Typography> */}
							<React.Fragment>
								<Grid item xs direction="row" gap={2} container>
									{allergies.length > 0 ? (
										allergies.map((item: string, index: number) => {
											return (
												<Button key={index} variant="contained" color="primary">
													{item}
												</Button>
											);
										})
									) : (
										<React.Fragment />
									)}
								</Grid>
							</React.Fragment>
						</Grid>
						<Grid item xs container direction="row" spacing={2}>
							<Grid item>
								<Button sx={{ color: "#ea2929" }} onClick={handleRemoveButton}>
									Remove
								</Button>
							</Grid>
							<Grid item>
								<Button>Edit</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant="subtitle1" component="div" sx={{ m: 1 }}>
							{created_at_readable_format}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default DrugAllergyDataEntries;
