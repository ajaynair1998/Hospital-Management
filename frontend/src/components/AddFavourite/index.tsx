import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { getFavourites } from "../../helpers/functions";
import { setFavourites } from "../../redux/Reducers/favouritesDataReducer";

interface Props {
	category: string;
}
const AddFavourite: React.FC<Props> = ({ category }) => {
	const dispatch = useDispatch();
	const [data, setData] = useState("");
	let handleChange = (data: string) => {
		setData(data);
	};

	let handleAdd = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		let success = await addNewFavourite(category, data);
		if (success) {
			setData("");
			let favourites = await getFavourites();
			if (favourites.status === 200) {
				dispatch(setFavourites(favourites.data));
			}
		}
	};

	let addNewFavourite = async (
		category: string,
		data: string
	): Promise<any> => {
		try {
			let response = await window.electron.favouritesApi.post({
				category,
				data,
			});
			if (response.status === 200) {
				let allFavourites = await getFavourites();
				console.log(allFavourites);
			}
			console.log(response);
			return true;
		} catch (err) {
			console.log(err);
			return false;
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
