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
import { InputSwitcher } from "./switcher";
import {
	setInputDialogState,
	setSelectedInputValue,
} from "../../redux/Reducers/utilDataReducer";

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
			sx={{ m: 0, p: 2, pl: 4, width: "600px", overflowX: "hidden!important" }}
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

export default function InputDialog() {
	// get the current location (category) for displaying the necessary input fields
	const dispatch = useDispatch();
	const { location, category_name } = useSelector(
		(state: IStore) => state.categoriesStore.data
	);

	const { inputDialogOpen } = useSelector(
		(state: IStore) => state.utilDataStore.data
	);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		dispatch(setSelectedInputValue(""));
		setOpen(false);
		dispatch(setInputDialogState({ inputDialogOpen: false }));
	};

	React.useEffect(() => {
		setOpen(inputDialogOpen);
	}, [inputDialogOpen]);

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
					Add a new {category_name}
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
