import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { capitalizeFirstLetter, getFavourites } from "../../helpers/functions";
import FavouritesHook from "../../hooks/favourites";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import { setFavourites } from "../../redux/Reducers/favouritesDataReducer";

interface Props {}

interface IFavouriteChip {
	id: number;
	favouriteName: string;
	onDelete: (id: number) => void;
	selected: boolean;
}
const FavouriteChip = ({
	id,
	favouriteName,
	onDelete,
	selected,
}: IFavouriteChip) => {
	if (selected) {
		return (
			<Chip
				label="Extra Soft"
				deleteIcon={<DeleteIcon />}
				onDelete={() => onDelete(id)}
			/>
		);
	} else {
		return (
			<Chip
				label="Medium"
				deleteIcon={<DeleteIcon />}
				variant="outlined"
				onDelete={() => onDelete(id)}
			/>
		);
	}
};

export default function Favourites({}: Props) {
	let dispatch = useDispatch();
	let favourites = useSelector(
		(state: IStore) => state.favouritesDataStore.data
	);
	FavouritesHook();

	const deleteFavourite = async (id: number) => {
		try {
			await window.electron.favouritesApi.delete({ id: id });
			let favourites = await getFavourites();
			if (favourites.status === 200) {
				dispatch(setFavourites(favourites.data));
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="h5" component="div">
							Favourites
						</Typography>
					</Grid>
					<Grid item>
						{/* <Typography gutterBottom variant="h6" component="div">
							Add Favourite
						</Typography> */}
						{/* <Box>
							<Button>Add New Favourite</Button>
						</Box> */}
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box sx={{ m: 2 }}>
				<Stack
					direction="row"
					spacing={1}
					flexWrap={"wrap"}
					alignItems={"flex-start"}
				>
					{/* <Chip
						label="Extra Soft"
						deleteIcon={<DeleteIcon />}
						variant="outlined"
					/>
					<Chip
						color="primary"
						label="Soft"
						deleteIcon={<DeleteIcon />}
						onDelete={() => {}}
					/>
					<Chip
						label="Medium"
						deleteIcon={<DeleteIcon />}
						variant="outlined"
						onDelete={() => {}}
					/> */}

					{favourites &&
						favourites.length > 0 &&
						favourites.map((item: any) => {
							return (
								<Chip
									key={item.id}
									label={capitalizeFirstLetter(item.data)}
									deleteIcon={<DeleteIcon />}
									variant="outlined"
									onDelete={() => {
										deleteFavourite(item.id);
									}}
									sx={{
										mb: "10px!important",
										ml: "0px!important",
										mr: "5px!important",
									}}
								/>
							);
						})}

					{/* <Chip label="Hard" deleteIcon={<DeleteIcon />} variant="outlined" /> */}
				</Stack>
			</Box>
		</Box>
	);
}
