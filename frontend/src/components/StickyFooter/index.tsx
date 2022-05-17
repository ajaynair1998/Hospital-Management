import { AppBar, Box, Button } from "@mui/material";
import React from "react";
import NavigationIcon from "@mui/icons-material/Navigation";

const StickyFooter = () => {
	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
			/* you can also use 'auto' behaviour
         in place of 'smooth' */
		});
	};
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
				<Button variant="outlined">Next</Button>
				<Button
					variant="outlined"
					sx={{ alignContent: "baseline" }}
					onClick={goToTop}
				>
					<NavigationIcon /> Go to Top
				</Button>
			</Box>
		</AppBar>
	);
};

export default StickyFooter;
