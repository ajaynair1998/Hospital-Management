import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import { Alert } from "@mui/material";
import { setSnackBarState } from "../../redux/reducers/utilDataReducer";

export interface State extends SnackbarOrigin {
	open: boolean;
	text?: string;
}

export default function PositionedSnackbar() {
	let dispatch = useDispatch();
	let data = useSelector((state: IStore) => state.utilDataStore.data);
	const [state, setState] = React.useState<State>({
		open: false,
		vertical: "top",
		horizontal: "right",
		text: "",
	});
	const { vertical, horizontal, open } = state;

	const handleClick = (newState: SnackbarOrigin) => () => {
		setState({ open: true, ...newState });
	};

	const handleClose = () => {
		dispatch(setSnackBarState({ snackBarOpen: false, text: "" }));
	};

	React.useEffect(() => {
		setState({ ...state, open: data.snackBarOpen, text: data.snackBarText });
	}, [data]);

	const buttons = (
		<React.Fragment>
			<Button
				onClick={handleClick({
					vertical: "top",
					horizontal: "center",
				})}
			>
				Top-Center
			</Button>
			<Button
				onClick={handleClick({
					vertical: "top",
					horizontal: "right",
				})}
			>
				Top-Right
			</Button>
			<Button
				onClick={handleClick({
					vertical: "bottom",
					horizontal: "right",
				})}
			>
				Bottom-Right
			</Button>
			<Button
				onClick={handleClick({
					vertical: "bottom",
					horizontal: "center",
				})}
			>
				Bottom-Center
			</Button>
			<Button
				onClick={handleClick({
					vertical: "bottom",
					horizontal: "left",
				})}
			>
				Bottom-Left
			</Button>
			<Button
				onClick={handleClick({
					vertical: "top",
					horizontal: "left",
				})}
			>
				Top-Left
			</Button>
		</React.Fragment>
	);

	return (
		<div>
			<Snackbar
				color="text.success"
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				onClose={handleClose}
				message={state.text}
				key={vertical + horizontal}
				autoHideDuration={6000}
			>
				<Alert severity="success" onClose={handleClose}>
					{state.text}
				</Alert>
			</Snackbar>
		</div>
	);
}
