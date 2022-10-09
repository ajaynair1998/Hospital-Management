import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
	width?: string;
}

interface IProps {
	content: React.ReactElement<any, any>;
	title: string;
	handleClose: (state: boolean) => void;
	open: boolean;
	width?: string;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle
			sx={{
				m: 0,
				p: 2,
				width: !props.width ? "600px" : props.width,
				overflowX: "hidden!important",
			}}
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

export default function DialogSkeleton(props: IProps) {
	return (
		<React.Fragment>
			<BootstrapDialog
				onClose={() => props.handleClose(false)}
				aria-labelledby="customized-dialog-title"
				open={props.open}
				maxWidth={props.width as unknown as undefined}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={() => props.handleClose(false)}
					width={props.width}
				>
					{props.title}
				</BootstrapDialogTitle>
				<DialogContent dividers>{props.content}</DialogContent>
			</BootstrapDialog>
		</React.Fragment>
	);
}
