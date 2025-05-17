import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IPastMedicalHistory, IStore } from "../../helpers/interfaces";
import { IChiefComplaint, ITreatmentPlan } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setPastMedicalHistory,
	setTreatmentPlan,
} from "../../redux/reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import DeleteIcon from "@mui/icons-material/Delete";

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

const TreatmentPlanDataEntries = (props: { summary?: boolean }) => {
	const [selectedTreatment, setSelectedTreatment] = React.useState(null);
	const [selectedTreatmentText, setSelectedTreatmentText] = React.useState("");
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const treatment_plans = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.treatment_plan
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);

	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	let dispatch = useDispatch();
	const fetchAllExistingTreatmentPlans = async () => {
		let response = await window.electron.TreatmentPlanApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		if (response.status === 200) {
			dispatch(setTreatmentPlan(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.TreatmentPlanApi.delete({
				id: selectedTreatment,
			});
			setDialogOpen(false);
			await fetchAllExistingTreatmentPlans();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingTreatmentPlans();
	}, []);
	return treatment_plans.length ? (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="subtitle2" component="div">
							{props.summary ? "TREATMENT PLANS" : "DATA ENTRIES"}
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box m={2}>
				{treatment_plans &&
					treatment_plans.map((item: ITreatmentPlan) => {
						return (
							<TreatmentPlanDataEntry
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
	) : (
		<React.Fragment />
	);
};

export function TreatmentPlanDataEntry({
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
				<Grid item xs={12} sm container direction={"column-reverse"}>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs sx={{ mx: 1 }}>
							<Typography gutterBottom variant="subtitle1" component="div">
								{treatment}
							</Typography>
							<Typography variant="body2" color="text.secondary" gutterBottom>
								{durationValue}
							</Typography>
							{detailValue && (
								<Box>
									<Typography
										variant="caption"
										gutterBottom
										mt={0}
										fontSize={10}
									>
										DETAILS
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
								<Button
									sx={{
										color: "#ea2929",
										borderColor: "#ea2929",
										ml: 1,
										width: "90px",
										"&:hover": {
											borderColor: "#ea2929",
											color: "#ea2929",
										},
									}}
									disableFocusRipple
									onClick={handleRemoveButton}
									variant="outlined"
								>
									<Typography
										variant="caption"
										fontSize={10}
										sx={{ pb: 0 }}
										onClick={handleRemoveButton}
									>
										REMOVE
									</Typography>
								</Button>
							</Grid>
							{/* <Grid item>
								<Button>Edit</Button>
							</Grid> */}
						</Grid>
					</Grid>
					<Grid item container justifyContent={"flex-end"}>
						<Typography variant="subtitle1" component="div" sx={{ mx: 1 }}>
							{created_at_readable_format}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default TreatmentPlanDataEntries;
