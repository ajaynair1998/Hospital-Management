import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { generateUniqueId } from "../../helpers";

interface ChipData {
	key: number;
	label: string;
}

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

interface ISelectionArrayProps {
	returnSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	clear?: boolean;
	items?: any[];
	deleteAction: Function;
}

interface ISelectedItems {
	[key: string]: {
		name: string;
		selected: boolean;
		id: string;
	};
}
export default function SelectionArray({
	returnSelectedItems,
	clear,
	items,
	deleteAction,
}: ISelectionArrayProps) {
	const [selectedItems, setSelectedItems] = useState<ISelectedItems>({
		// dlfassda: {
		// 	name: "toothpain",
		// 	selected: true,
		// 	id: "23swdswf",
		// },
		// dlfasda: {
		// 	name: "backpain",
		// 	selected: false,
		// 	id: "asd234s",
		// },
	});

	const [selectedItemsAsArray, setSelectedItemsAsArray] = useState<string[]>(
		[]
	);

	useEffect(() => {
		let selected: string[] = [];
		Object.values(selectedItems).forEach((item) => {
			if (item.selected) {
				selected.push(item.name);
			}
		});
		console.log(
			"🚀 ~ file: index.tsx ~ line 51 ~ useEffect ~ selected",
			selected
		);
		returnSelectedItems(selected);
	}, [selectedItems]);

	useEffect(() => {
		let copyOfSelectedItems: ISelectedItems = {};
		items?.forEach((item: any) => {
			let key = generateUniqueId();
			if (copyOfSelectedItems[item] === undefined) {
				copyOfSelectedItems[key] = {
					name: item.data,
					selected: false,
					id: item.id,
				};
			}
		});
		setSelectedItems({ ...copyOfSelectedItems });
	}, [clear]);

	useEffect(() => {
		let copyOfSelectedItems = { ...selectedItems };
		items?.forEach((item: any) => {
			let key = generateUniqueId();
			if (copyOfSelectedItems[item] === undefined) {
				copyOfSelectedItems[key] = {
					name: item.data,
					selected: false,
					id: item.id,
				};
			}
		});
		setSelectedItems({ ...copyOfSelectedItems });
	}, []);
	const handleDelete = (key: string) => () => {
		let copyOfSelectedItems = { ...selectedItems };
		deleteAction(copyOfSelectedItems[key].id);
		console.log(
			"🚀 ~ file: index.tsx ~ line 88 ~ handleDelete ~ copyOfSelectedItems[key]",
			copyOfSelectedItems[key]
		);
		delete copyOfSelectedItems[key];
		setSelectedItems({ ...copyOfSelectedItems });
	};

	const handleSelect = (key: string) => {
		let copyOfSelectedItems = { ...selectedItems };
		copyOfSelectedItems[key]["selected"] =
			!copyOfSelectedItems[key]["selected"];
		setSelectedItems({ ...copyOfSelectedItems });
	};

	return (
		<Paper
			elevation={0}
			sx={{
				display: "flex",
				justifyContent: "center",
				flexWrap: "wrap",
				listStyle: "none",
				p: 0.5,
				m: 0,
			}}
			component="ul"
		>
			{Object.entries(selectedItems).map((item) => {
				let key = item[0];
				let value = item[1];
				let icon;

				return (
					<ListItem key={key}>
						<Chip
							icon={icon}
							label={value.name}
							onDelete={handleDelete(key)}
							style={{
								background: `${value.selected ? "#b2bcef" : ""}`,
							}}
							onClick={() => handleSelect(key)}
						/>
					</ListItem>
				);
			})}
		</Paper>
	);
}
