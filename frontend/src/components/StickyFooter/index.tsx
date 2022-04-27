import { AppBar, Box, Button } from "@mui/material";
import React from "react";

const StickyFooter = () => {
	return (
		<AppBar
			elevation={0}
			sx={{
				position: "sticky",
				bottom: "0",
				zIndex: 150,
				backgroundColor: "#ffffff",
				m: 0,
				height: "50px",
				width: "100%",
				borderWidth: 0,
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
					pr: 2,
				}}
			>
				<Button variant="outlined">Exit</Button>
				<Button variant="outlined">Save All</Button>
			</Box>
		</AppBar>
	);
};

export default StickyFooter;
