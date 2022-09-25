import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import {
	setAddNewMedicineInputDialogState,
	setAddNewPatientInputDialogState,
	setInputDialogState,
} from "../../redux/Reducers/utilDataReducer";
import { AppBar, Box } from "@mui/material";
import { width } from "@mui/system";
import DotsStepper from "../Stepper";
import {
	resetNewMedicineDataFields,
	setMedicines,
	setNewPatientStage,
} from "../../redux/Reducers/appStateDataReducer";
import moment from "moment";
import StageZero from "./stages/stage-0";

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

export default function AddNewMedicineInputModal() {
	// get the current location (category) for displaying the necessary input fields
	const dispatch = useDispatch();
	const { addNewMedicineInputDialogOpen } = useSelector(
		(state: IStore) => state.utilDataStore.data
	);
	let { name, strength, medicine_form, description } = useSelector(
		(state: IStore) => state.applicationDataStore.newMedicine
	);

	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
		dispatch(
			setAddNewMedicineInputDialogState({
				addNewMedicineInputDialogOpen: false,
			})
		);
	};

	const handleSubmit = async () => {
		try {
			console.log("pressed save");
			let newMedicine = await window.electron.MedicineApi.post({
				name,
				strength,
				description,
				medicine_form,
			});
			dispatch(resetNewMedicineDataFields({}));
			dispatch(
				setAddNewMedicineInputDialogState({
					addNewMedicineInputDialogOpen: false,
				})
			);
			await getAllMedicines();
		} catch (err: any) {
			console.log(err.message);
		}
	};
	const getAllMedicines = async () => {
		try {
			let medicines = await window.electron.MedicineApi.get({});
			console.log(
				"🚀 ~ file: index.tsx ~ line 115 ~ getAllMedicines ~ medicines",
				medicines
			);

			dispatch(setMedicines({ medicines: medicines.data }));
		} catch (err) {
			console.log(err);
		}
	};
	React.useEffect(() => {
		setOpen(addNewMedicineInputDialogOpen);
	}, [addNewMedicineInputDialogOpen]);

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
					Add a new Medicine
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<StageZero />
					<AppBar
						elevation={0}
						sx={{
							position: "sticky",
							bottom: "0",
							zIndex: 150,
							backgroundColor: "#ffffff",
							m: 2,
							my: "0!important",
							height: "50px",
							width: "90%",
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
								onClick={() => handleSubmit()}
							>
								Save
							</Button>
						</Box>
					</AppBar>
				</DialogContent>
			</BootstrapDialog>
		</React.Fragment>
	);
}
