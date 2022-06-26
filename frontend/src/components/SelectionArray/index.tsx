import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { generateUniqueId } from "../../helpers";
import { ISelectedItems } from "../DrugAllergyInput";

interface ChipData {
	key: number;
	label: string;
}

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

interface ISelectionArrayProps {
	items?: ISelectedItems;
	deleteAction?: Function;
	selectAction?: Function;
}

export default function SelectionArray({
	items,
	deleteAction,
	selectAction,
}: ISelectionArrayProps) {
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
			{items &&
				Object.entries(items).map((item) => {
					let key = item[0];
					let value = item[1];
					let icon;

					return (
						<ListItem key={key}>
							<Chip
								icon={icon}
								label={value.name}
								onDelete={
									deleteAction ? () => deleteAction(value.id, key) : undefined
								}
								style={{
									background: `${value.selected ? "#b2bcef" : ""}`,
								}}
								onClick={selectAction ? () => selectAction(key) : undefined}
							/>
						</ListItem>
					);
				})}
		</Paper>
	);
}
