import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

interface IButton {
	text: string;
	onClick: (e: any) => any;
}

export default function BasicSaveAllButton({ text, onClick }: IButton) {
	return (
		<Box
			sx={{
				m: 2,
			}}
		>
			<Button variant="contained" onClick={(e) => onClick(e)}>
				{text}
			</Button>
		</Box>
	);
}
