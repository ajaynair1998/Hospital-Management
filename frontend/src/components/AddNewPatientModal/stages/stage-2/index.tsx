import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const StageTwo = () => {
	let [mobileNumber, setMobileNumber] = useState("");
	let [occupation, setOccupation] = useState("");
	let [referredBy, setReferredBy] = useState("");
	let [email, setEmail] = useState("");

	return (
		<React.Fragment>
			<Box
				component="form"
				sx={{
					// "& > :not(style)": { m: 2, width: "25ch" },
					"& > :not(style)": { m: 2, width: "90%" },
				}}
				noValidate
				autoComplete="off"
				display={"flex"}
				flexDirection={"column"}
			>
				<TextField
					id="outlined-basic"
					label="Email"
					variant="outlined"
					value={email}
					// sx={{ width: "200px!important" }}

					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Mobile Number"
					variant="outlined"
					value={mobileNumber}
					// sx={{ width: "200px!important" }}

					onChange={(e) => setMobileNumber(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Occupation"
					variant="outlined"
					value={occupation}
					// sx={{ width: "200px!important" }}

					onChange={(e) => setOccupation(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Referred By"
					variant="outlined"
					value={referredBy}
					// sx={{ width: "200px!important" }}

					onChange={(e) => setReferredBy(e.target.value)}
				/>
			</Box>
		</React.Fragment>
	);
};

export default StageTwo;
