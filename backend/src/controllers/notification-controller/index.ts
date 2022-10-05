import { Notification } from "electron";
const NotificationController = (event: any, message: string): any => {
	new Notification({ title: "Notification", body: message }).show();
};

export default NotificationController;
