import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	ILocalExamination,
	IPastMedicalHistory,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint, ITreatmentPlan } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setPastMedicalHistory,
	setTreatmentPlan,
	setLocalExamination,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import { IIntraOral } from "../LocalExaminationInput";
import BasicAccordion from "../BasicAccordion";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	extraoral: string;
	intraoral: IIntraOral;
	id?: number;
	handleSelectLocalExamination: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocalExaminationDataEntries = () => {
	const [selectedLocalExamination, setSelectedLocalExamination] =
		React.useState(null);
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const local_examinations = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.local_examination
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let dispatch = useDispatch();
	const fetchAllExistingLocalExaminations = async () => {
		let response = await window.electron.LocalExaminationApi.get({
			treatmentDetailId: patientTreatmentDetailId,
		});
		console.log(
			"🚀 ~ file: index.tsx ~ line 52 ~ fetchAllExistingLocalExaminations ~ response",
			response
		);
		if (response.status === 200) {
			dispatch(setLocalExamination(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.LocalExaminationApi.delete({
				id: selectedLocalExamination,
			});
			setDialogOpen(false);
			await fetchAllExistingLocalExaminations();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingLocalExaminations();
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
				{local_examinations &&
					local_examinations.map((item: ILocalExamination) => {
						return (
							<LocalExaminationDataEntry
								createdAt={item.createdAt}
								extraoral={item.extra_oral}
								intraoral={item.intra_oral}
								id={item.id}
								key={item.id}
								handleSelectLocalExamination={setSelectedLocalExamination}
								openDialog={setDialogOpen}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove this Local examination ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	);
};

export function LocalExaminationDataEntry({
	createdAt,
	extraoral,
	intraoral,
	id,
	handleSelectLocalExamination,
	openDialog,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [localExamination, setLocalExamination] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
	}, []);

	const handleRemoveButton = async () => {
		try {
			handleSelectLocalExamination(id);
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
							<Typography
								gutterBottom
								variant="subtitle1"
								component="div"
								color={"#fff"}
							>
								Local Examination
							</Typography>
							{extraoral !== "" && (
								<React.Fragment>
									<Typography
										variant="body2"
										color="text.secondary"
										gutterBottom
									>
										Extra oral
									</Typography>

									<Box>
										<Divider />
										<Typography variant="body2" gutterBottom mt={1}>
											{extraoral}
										</Typography>
									</Box>
								</React.Fragment>
							)}
							{
								<React.Fragment>
									<Typography
										variant="body2"
										color="text.secondary"
										gutterBottom
										sx={{ mb: 1 }}
									>
										Intra oral
									</Typography>
									<Divider sx={{ mb: 2 }} />
									<React.Fragment>
										{Object.entries(intraoral)
											.reverse()
											.map((item) => {
												return (
													<BasicAccordion
														arrayOfItems
														key={item[0]}
														details={item[1].details}
														id={item[0]}
														heading={
															item[1].teeth.length > 0
																? item[1].teeth.join(" , ")
																: ""
														}
													/>
												);
											})}
									</React.Fragment>
								</React.Fragment>
							}
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

export default LocalExaminationDataEntries;
