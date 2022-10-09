import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

interface IAlertDialog {
	action: Function;
	text: string;
	isOpen: boolean;
	close: Function;
	title?: string;
}

export default function AlertDialog({
	action,
	text,
	isOpen,
	close,
	title,
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
				maxWidth={"500px" as unknown as undefined}
			>
				<DialogTitle id="alert-dialog-title">
					<Typography variant="caption">{title ? title : "CONFIRM"}</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<Typography variant="subtitle2" minWidth={"500px"}>
							{text}
						</Typography>
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
