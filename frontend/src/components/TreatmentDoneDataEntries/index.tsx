import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	IPastMedicalHistory,
	IStore,
	ITreatmentDone,
} from "../../helpers/interfaces";
import { IChiefComplaint, ITreatmentPlan } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setPastMedicalHistory,
	setTreatmentDone,
	setTreatmentPlan,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	treatment: string;
	details?: string;
	duration?: string;
	id?: number;
	handleSelectTreatment: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedTreatmentText: React.Dispatch<React.SetStateAction<string>>;
}

const TreatmentDoneDataEntries = () => {
	const [selectedTreatment, setSelectedTreatment] = React.useState(null);
	const [selectedTreatmentText, setSelectedTreatmentText] = React.useState("");
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const treatment_plans = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.treatment_done
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let dispatch = useDispatch();
	const fetchAllExistingTreatmentsDone = async () => {
		let response = await window.electron.TreatmentDoneApi.get({
			treatmentDetailId: patientTreatmentDetailId,
		});
		if (response.status === 200) {
			dispatch(setTreatmentDone(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.TreatmentDoneApi.delete({
				id: selectedTreatment,
			});
			setDialogOpen(false);
			await fetchAllExistingTreatmentsDone();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingTreatmentsDone();
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
				{treatment_plans &&
					treatment_plans.map((item: ITreatmentDone) => {
						return (
							<TreatmentDoneDataEntry
								createdAt={item.createdAt}
								treatment={item.treatment}
								details={item.details}
								duration={item.duration}
								id={item.id}
								key={item.id}
								handleSelectTreatment={setSelectedTreatment}
								openDialog={setDialogOpen}
								setSelectedTreatmentText={setSelectedTreatmentText}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove ${selectedTreatmentText} ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	);
};

export function TreatmentDoneDataEntry({
	createdAt,
	treatment,
	details,
	duration,
	id,
	handleSelectTreatment,
	openDialog,
	setSelectedTreatmentText,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [treatmentPlan, setTreatmentPlan] = React.useState<any>("");
	const [durationValue, setDuration] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setTreatmentPlan(treatment);
		setDuration(duration);
		setDetail(details);
	}, []);

	const handleRemoveButton = async () => {
		try {
			handleSelectTreatment(id);
			setSelectedTreatmentText(treatment);
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
						<Grid item xs sx={{ m: 1 }}>
							<Typography gutterBottom variant="subtitle1" component="div">
								{treatment}
							</Typography>
							<Typography variant="body2" color="text.secondary" gutterBottom>
								{durationValue}
							</Typography>
							{detailValue && (
								<Box>
									<Typography variant="body2" gutterBottom mt={0}>
										Details
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{detailValue}
									</Typography>
								</Box>
							)}
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

export default TreatmentDoneDataEntries;
