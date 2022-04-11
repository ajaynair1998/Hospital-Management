import { Notification } from "electron";
const NotificationController = (event: any, message: string): any => {
	new Notification({ title: "Notification", body: message }).show();
	console.log("hi");
};

export default NotificationController;
