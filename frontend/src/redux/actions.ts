import * as types from "./actionTypes";

let actions = {
	getUserDetail: (user_id: number) => {
		return (dispatch: any) => {
			window.electron.notificationApi.sendNotification(
				"notification from react"
			);
			dispatch({
				type: types.USER_DETAIL,
				userData: { name: "ajay", id: 1 },
			});
		};
	},
};

export default actions;
