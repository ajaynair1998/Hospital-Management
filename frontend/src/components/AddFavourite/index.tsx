import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface Props {
	addNewFavourite: (category: string, data: string) => Promise<any>;
	category: string;
}
const AddFavourite: React.FC<Props> = ({ addNewFavourite, category }) => {
	const [data, setData] = useState("");
	let handleChange = (data: string) => {
		setData(data);
	};
	let handleAdd = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		console.log("Add pressed on favourite");
		let success = await addNewFavourite(category, data);
		if (success) {
			setData("");
		}
	};
	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
			margin={1}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					alignItems: "flex-start",
				}}
			>
				<TextField
					id="outlined-helperText"
					label="Add data"
					value={data}
					onChange={(e) => handleChange(e.target.value)}
				/>
				<Button
					variant="contained"
					sx={{ height: "55px", mt: 1 }}
					onClick={(e) => handleAdd(e)}
				>
					Add
				</Button>
			</div>
		</Box>
	);
};

export default AddFavourite;
