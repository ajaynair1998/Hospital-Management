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
	IDiagnosis,
	IFollowUp,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setClinicalDiagnosis,
	setDiagnosis,
	setFollowUps,
} from "../../redux/reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import { purple } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	follow_up_text?: string;
	follow_up_date?: Date | string;
	id?: number;
	purpose: string;
	handleSelectFollowUp: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowUpDataEntries = (props: { summary?: boolean }) => {
	const [selectedFollowUp, setSelectedFollowUp] = React.useState(null);
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const follow_ups = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.follow_ups
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);

	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	let dispatch = useDispatch();
	const fetchAllExistingFollowUps = async () => {
		let response = await window.electron.FollowUpApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		if (response.status === 200) {
			dispatch(setFollowUps(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.FollowUpApi.delete({
				id: selectedFollowUp,
			});
			setDialogOpen(false);
			await fetchAllExistingFollowUps();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingFollowUps();
	}, []);
	return follow_ups.length ? (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="subtitle2" component="div">
							{props.summary ? "FOLLOW UP'S" : "DATA ENTRIES"}
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box m={2}>
				{follow_ups &&
					follow_ups.map((item: IFollowUp) => {
						return (
							<FollowUpDataEntry
								createdAt={item.createdAt}
								follow_up_text={item.follow_up_text}
								follow_up_date={item.follow_up_date}
								id={item.id}
								key={item.id}
								handleSelectFollowUp={setSelectedFollowUp}
								openDialog={setDialogOpen}
								purpose={item.purpose}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove this follow up ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	) : (
		<React.Fragment />
	);
};

export function FollowUpDataEntry({
	createdAt,
	follow_up_text,
	id,
	follow_up_date,
	handleSelectFollowUp,
	purpose,
	openDialog,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [followUp, setFollowUp] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);
	let followUpDateReadableFormat = convertToReadableDate(follow_up_date);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setFollowUp(follow_up_text);
	}, []);

	const handleRemoveButton = async () => {
		try {
			handleSelectFollowUp(id);
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
							<Grid item xs direction="row" gap={2} container mb={1}>
								<Button
									variant="contained"
									sx={{
										background: "#2631fe",
									}}
									disableFocusRipple
									disableTouchRipple
									disableElevation
								>
									<Typography fontSize={12}>{purpose}</Typography>
								</Button>
								<Button
									variant="contained"
									sx={{
										background: "#207718",
									}}
									disableFocusRipple
									disableTouchRipple
									disableElevation
								>
									<Typography fontSize={12}>
										{followUpDateReadableFormat}
									</Typography>
								</Button>
							</Grid>
							{follow_up_text && (
								<React.Fragment>
									<Typography
										variant="caption"
										gutterBottom
										mt={2}
										fontSize={10}
									>
										DETAILS
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{follow_up_text}
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

export default FollowUpDataEntries;
