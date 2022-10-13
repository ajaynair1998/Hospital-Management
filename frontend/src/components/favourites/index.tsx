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
import {
	setInputDialogState,
	setSelectedInputValue,
} from "../../redux/Reducers/utilDataReducer";
import AlertDialog from "../Dialog";

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
	let { data } = useSelector((state: IStore) => state.categoriesStore);

	let [selectedFavouriteText, setSelectedFavouriteText] =
		React.useState<string>(null as unknown as string);
	let [selectedFavouriteId, setSelectedFavouriteId] = React.useState<number>(
		null as unknown as number
	);
	let [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
	FavouritesHook();

	const handleClick = (data: string) => {
		dispatch(setSelectedInputValue(data));
		dispatch(setInputDialogState({ inputDialogOpen: true }));
	};

	const deleteFavourite = async () => {
		try {
			await window.electron.favouritesApi.delete({ id: selectedFavouriteId });
			let favourites = await getFavourites(data.location);
			if (favourites.status === 200) {
				dispatch(setFavourites(favourites.data));
			}
			setDialogOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleRemoveButton = (id: number, text: string) => {
		try {
			setSelectedFavouriteId(id);
			setSelectedFavouriteText(text);
			setDialogOpen(true);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
				<Box sx={{ my: 1, mx: 2 }}>
					<Grid container alignItems="center">
						<Grid item xs>
							<Typography gutterBottom variant="subtitle2" component="div">
								FAVOURITES
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
										onClick={() => handleClick(item.data)}
										deleteIcon={
											<DeleteIcon
												sx={{
													color: "#fd5454!important",
													"&:hover": {
														color: "#ff0000!important",
														transform: "translateY(-10%)",
														transition: "0.5s easet",
													},
												}}
											/>
										}
										variant="outlined"
										onDelete={() => {
											handleRemoveButton(item.id, item.data);
										}}
										sx={{
											cursor: "pointer",
											mb: "10px!important",
											ml: "0px!important",
											mr: "5px!important",
											gap: "10px",
											justifyContent: "space-between",
										}}
									/>
								);
							})}

						{/* <Chip label="Hard" deleteIcon={<DeleteIcon />} variant="outlined" /> */}
					</Stack>
				</Box>
			</Box>
			<AlertDialog
				action={deleteFavourite}
				isOpen={dialogOpen}
				text={`Do you want to remove ${selectedFavouriteText} ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	);
}
