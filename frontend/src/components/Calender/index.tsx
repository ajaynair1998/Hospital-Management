import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	WeekView,
	Appointments,
	Toolbar,
	ViewSwitcher,
	MonthView,
	DayView,
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "./demo";

export const CalenderComponant = () => {
	let [data, setData] = React.useState(appointments);
	let [currentViewName, setCurrentViewName] = React.useState<any>("work-week");
	const currentViewNameChange = (currentViewName: any) => {
		setCurrentViewName(currentViewName);
	};

	return (
		<Paper>
			<Scheduler data={data} height={660}>
				<ViewState
					defaultCurrentDate="2018-07-25"
					currentViewName={currentViewName}
					onCurrentViewNameChange={currentViewNameChange}
				/>

				<WeekView startDayHour={10} endDayHour={19} />
				<WeekView
					name="work-week"
					displayName="Work Week"
					excludedDays={[0, 6]}
					startDayHour={9}
					endDayHour={19}
				/>
				<MonthView />
				<DayView />

				<Toolbar />
				<ViewSwitcher />
				<Appointments />
			</Scheduler>
		</Paper>
	);
};
