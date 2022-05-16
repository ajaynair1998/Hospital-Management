import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IAlertDialog {
	action: Function;
	text: string;
	isOpen: boolean;
	close: Function;
}

export default function AlertDialog({
	action,
	text,
	isOpen,
	close,
}: IAlertDialog) {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		close();
	};

	const handleYes = async () => {
		await action();
	};

	React.useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Use Google's location service?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{text}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>No</Button>
					<Button onClick={handleYes} autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
