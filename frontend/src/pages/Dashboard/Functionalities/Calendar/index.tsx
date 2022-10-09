import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Event } from "react-big-calendar";
import ReactBigCalender from "../../../../components/ReactBigCalender";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";

const Calender = () => {
	const [followUps, setFollowUps] = React.useState<Event[]>([] as Event[]);
	const fetchAllExistingFollowUps = async () => {
		let response = await window.electron.FollowUpApi.get({
			multiple: true,
		});
		if (response.status === 200) {
			let { data } = response;
			let transformedDate = data.map((item: any) => {
				const thisDate = new Date(item.follow_up_date);
				const start = startOfHour(addHours(thisDate, 0));
				const end = startOfHour(addHours(start, 1));

				return {
					start: start,
					title: `${item.purpose}  -  ${item.name}`,
					end: end,
				};
			});
			setFollowUps(transformedDate);
		}
	};

	React.useEffect(() => {
		fetchAllExistingFollowUps();
	}, []);
	return (
		<React.Fragment>
			<Container>
				<Box>
					<Grid
						container
						direction={"row"}
						spacing={3}
						justifyContent={"flex-start"}
						alignItems={"flex-start"}
					>
						<Grid item xs={12}>
							<ReactBigCalender events={followUps} />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Calender;
