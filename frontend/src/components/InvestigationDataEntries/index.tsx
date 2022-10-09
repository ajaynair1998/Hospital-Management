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
	IInvestigation,
	IPastMedicalHistory,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint, ITreatmentPlan } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setDrugAllergies,
	setInvestigation,
	setPastMedicalHistory,
	setTreatmentPlan,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import SelectedArray from "../SelectedArray";
import { shrinkName } from "../../helpers/functions";
import InvestigationCard from "../InvestigationCard";
import DeleteIcon from "@mui/icons-material/Delete";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

const InvestigationDataEntries = (props: { summary?: boolean }) => {
	const [selectedInvestigation, setSelectedInvestigation] =
		React.useState(null);
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const investigations = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.investigation
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	let dispatch = useDispatch();
	const fetchAllExistingInvestigations = async () => {
		let response = await window.electron.InvestigationApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		if (response.status === 200) {
			dispatch(setInvestigation(response.data));
		}
	};
	let handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.InvestigationApi.delete({
				id: selectedInvestigation,
			});
			setDialogOpen(false);
			await fetchAllExistingInvestigations();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingInvestigations();
	}, []);
	return investigations.length ? (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="subtitle2" component="div">
							{props.summary ? "INVESTIGATIONS" : "DATA ENTRIES"}
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box m={2}>
				{investigations &&
					investigations.map((item: IInvestigation) => {
						return (
							<InvestigationCard
								createdAt={item.createdAt}
								file_data={item.file_data}
								id={item.id}
								key={item.id}
								handleSelectInvestigation={setSelectedInvestigation}
								file_name={item.file_name}
								file_type={item.file_type}
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
	) : (
		<React.Fragment />
	);
};

export default InvestigationDataEntries;
