import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	IGeneralExamination,
	IPastMedicalHistory,
	IPastSurgicalHistory,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setGeneralExamination,
	setPastMedicalHistory,
	setPastSurgicalHistory,
} from "../../redux/reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import { minWidth } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	bp: string;
	temperature?: string;
	oxygen_saturation?: string;
	pulse: string;
	respiration_rate: string;
	id?: number;
	handleSelectGeneralExamination: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const GeneralExaminationDataEntries = (props: { summary?: boolean }) => {
	const [selectedGeneralExamination, setSelectedGeneralExamination] =
		React.useState(null);
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const general_examination = useSelector(
		(state: IStore) =>
			state.patientTreatmentDetailsDataStore.general_examination
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	let dispatch = useDispatch();
	const fetchAllExistingGeneralExamination = async () => {
		let response = await window.electron.GeneralExaminationApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		if (response.status === 200) {
			dispatch(setGeneralExamination(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.GeneralExaminationApi.delete({
				id: selectedGeneralExamination,
			});
			setDialogOpen(false);
			await fetchAllExistingGeneralExamination();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingGeneralExamination();
	}, []);
	return general_examination.length ? (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="subtitle2" component="div">
							{props.summary ? "GENERAL EXAMINATIONS" : "DATA ENTRIES"}
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box m={2}>
				{general_examination &&
					general_examination.map((item: IGeneralExamination) => {
						return (
							<GeneralExaminationDataEntry
								createdAt={item.createdAt}
								bp={item.bp}
								temperature={item.temperature}
								oxygen_saturation={item.oxygen_saturation}
								pulse={item.pulse}
								respiration_rate={item.respiration_rate}
								id={item.id}
								key={item.id}
								handleSelectGeneralExamination={setSelectedGeneralExamination}
								openDialog={setDialogOpen}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove this General Examination ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	) : (
		<React.Fragment />
	);
};

export function GeneralExaminationDataEntry({
	createdAt,
	bp,
	temperature,
	oxygen_saturation,
	respiration_rate,
	pulse,
	id,
	handleSelectGeneralExamination,
	openDialog,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	const handleRemoveButton = async () => {
		try {
			handleSelectGeneralExamination(id);
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
							{pulse && (
								<React.Fragment>
									<Typography
										variant="caption"
										gutterBottom
										mt={2}
										fontSize={10}
									>
										PULSE
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{pulse}
									</Typography>
								</React.Fragment>
							)}
							{bp && (
								<React.Fragment>
									<Typography
										variant="caption"
										gutterBottom
										mt={2}
										fontSize={10}
									>
										BP
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{bp}
									</Typography>
								</React.Fragment>
							)}
							{oxygen_saturation && (
								<React.Fragment>
									<Typography
										variant="caption"
										gutterBottom
										mt={2}
										fontSize={10}
									>
										O ²
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{oxygen_saturation}
									</Typography>
								</React.Fragment>
							)}
							{respiration_rate && (
								<React.Fragment>
									<Typography
										variant="caption"
										gutterBottom
										mt={2}
										fontSize={10}
									>
										Respiration Rate
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{respiration_rate}
									</Typography>
								</React.Fragment>
							)}
							{temperature && (
								<React.Fragment>
									<Typography
										variant="caption"
										gutterBottom
										mt={2}
										fontSize={10}
									>
										TEMPERATURE
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{temperature}
									</Typography>
								</React.Fragment>
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

export default GeneralExaminationDataEntries;
