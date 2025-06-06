import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import { InputSwitcher } from "./switcher";
import {
	setAddNewPatientInputDialogState,
	setAddNewPatientMode,
	setEditPatientInputDialogState,
	setInputDialogState,
	setSnackBarState,
} from "../../redux/reducers/utilDataReducer";
import { AppBar, Box } from "@mui/material";
import { width } from "@mui/system";
import DotsStepper from "../Stepper";
import {
	resestPatientDataFields,
	resetEditPatientDataFields,
	resetSelectedPatientDataFields,
	setEditPatientStage,
	setNewPatientStage,
	setSelectedPatientConsultationDetails,
	setSelectedPatientProfileDetails,
} from "../../redux/reducers/appStateDataReducer";
import moment from "moment";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle
			sx={{ m: 0, p: 2, width: "600px", overflowX: "hidden!important" }}
			{...other}
		>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

export default function EditPatientInputModal() {
	// get the current location (category) for displaying the necessary input fields
	const dispatch = useDispatch();
	const { editPatientInputDialogOpen } = useSelector(
		(state: IStore) => state.utilDataStore.data
	);
	let patientId = useSelector(
		(state: IStore) =>
			state.applicationDataStore.selectedPatient.patientProfileDetails.id
	);
	let { stage } = useSelector(
		(state: IStore) => state.applicationDataStore.editPatient
	);

	let editPatientData = useSelector(
		(state: IStore) => state.applicationDataStore.editPatient
	);
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
		dispatch(setEditPatientInputDialogState(false));
		dispatch(setEditPatientStage({ stage: 0 }));
		dispatch(resetEditPatientDataFields({}));
	};

	const handleStepChange = (stage: number) => {
		try {
			dispatch(setEditPatientStage({ stage: stage }));
		} catch (err) {
			console.log(err);
		}
	};
	const handleUpdate = async () => {
		try {
			const transformedPatientData = { ...editPatientData };
			transformedPatientData.date_of_birth = moment(
				editPatientData.date_of_birth,
				"YYYY-MM-DD HH:mm:ss"
			).format("YYYY-MM-DD HH:mm:ss");

			let updatedPatient = await window.electron.PatientApi.put(
				transformedPatientData
			);
			if (updatedPatient.status === 200) {
				dispatch(
					setSnackBarState({
						snackBarOpen: true,
						text: "patient updated successfully",
					})
				);
				dispatch(setEditPatientInputDialogState(false));
				dispatch(setEditPatientStage({ stage: 0 }));
				dispatch(resetEditPatientDataFields({}));
				dispatch(resetSelectedPatientDataFields({}));
				await handleSelectedPatientChange(patientId);
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};
	const handleSelectedPatientChange = async (id: number) => {
		try {
			let patientProfileUpdated = await window.electron.PatientApi.get({
				searchTerm: id,
			});
			if (patientProfileUpdated.data.length > 0) {
				dispatch(resetSelectedPatientDataFields({}));
				dispatch(
					setSelectedPatientProfileDetails({
						patientProfileDetails: patientProfileUpdated.data[0],
					})
				);
			}
			let patientWithTreatmentDetails = await window.electron.PatientApi.get({
				patientId: patientId,
			});
			dispatch(
				setSelectedPatientConsultationDetails({
					patientConsultationDetails: patientWithTreatmentDetails.data,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	React.useEffect(() => {
		setOpen(editPatientInputDialogOpen);
	}, [editPatientInputDialogOpen]);

	return (
		<React.Fragment>
			{/* <Button variant="outlined" onClick={handleClickOpen}>
				Add New Data
			</Button> */}
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					{"Edit Patient"}
				</BootstrapDialogTitle>
				<DialogContent dividers>
					{/* <Typography gutterBottom>
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
						dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
						ac consectetur ac, vestibulum at eros.
					</Typography>
					<Typography gutterBottom>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
						Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
						auctor.
					</Typography>
					<Typography gutterBottom>
						Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
						cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
						dui. Donec ullamcorper nulla non metus auctor fringilla.
					</Typography> */}
					<InputSwitcher />
					{/* <AppBar
						elevation={0}
						sx={{
							position: "sticky",
							bottom: "0",
							// zIndex: 150,
							backgroundColor: "#ffffff",
							// m: 0,
							my: "0!important",
							height: "70px",
							width: "100%",
							borderWidth: 0,
							p: "0!important",
						}}
					>
						<Box
							width="90%"
							sx={{
								justifyContent: "flex-end",
								flexDirection: "row",
								alignContent: "center",
								display: "flex",
								alignItems: "center",
								margin: "auto",
								gap: "20px",
								m: 2,
								// pr: 2,
							}}
						>
							<Button
								variant="outlined"
								sx={{
									width: "120px!important",
									mr: "0",
								}}
							>
								Previous
							</Button>
							<Button
								variant="outlined"
								sx={{
									width: "120px!important",
									mr: "0",
								}}
							>
								Next
							</Button>
							<Button
								variant="outlined"
								sx={{
									width: "120px!important",
									mr: "0",
								}}
							>
								Save
							</Button>
						</Box>
					</AppBar> */}
					<DotsStepper
						setStep={handleStepChange}
						activeStep={stage}
						steps={3}
						handleSubmit={handleUpdate}
					/>
				</DialogContent>
				{/* <DialogActions>
					<Button autoFocus onClick={handleClose}>
						Save changes
					</Button>
				</DialogActions> */}
			</BootstrapDialog>
		</React.Fragment>
	);
}
