export interface IElectronAPI {
	notificationApi: { sendNotification: (message: string) => Promise<void> };
}
