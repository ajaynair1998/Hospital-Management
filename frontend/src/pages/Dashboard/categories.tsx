import * as React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import BiotechIcon from "@mui/icons-material/Biotech";
import HealingIcon from "@mui/icons-material/Healing";
import HistoryIcon from "@mui/icons-material/History";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import TodayIcon from "@mui/icons-material/Today";

import { ICategory } from "../../helpers/interfaces";

export const categoriesList: ICategory[] = [
	{
		key: 0,
		category_name: "Dashboard",
		category_icon: <AddShoppingCartIcon />,
		location: "dashboard",
	},

	{
		key: 1,
		category_name: "Patients",
		category_icon: <PersonSearchIcon />,
		location: "patients",
	},

	{
		key: 3,
		category_name: "Payments",
		category_icon: <HistoryIcon />,
		location: "payments",
	},
	{
		key: 4,
		category_name: "Calendar",
		category_icon: <PersonAddDisabledIcon />,
		location: "calendar",
	},
	{
		key: 5,
		category_name: "Settings",
		category_icon: <LocationSearchingIcon />,
		location: "settings",
	},
];
