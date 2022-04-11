import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextFieldComponent() {
	const [value, setValue] = React.useState("Controlled");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 2, width: "500px" },
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<TextField
					id="outlined-multiline-flexible"
					label="Details"
					multiline
					rows={4}
					value={value}
					onChange={handleChange}
				/>
			</div>
		</Box>
	);
}
