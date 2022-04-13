const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	notificationApi: {
		sendNotification(message: any) {
			ipcRenderer.send("notify", message);
		},
	},
	favouritesApi: {
		async get(req: IFavourite): Promise<any> {
			return ipcRenderer.invoke("favourites-get", req);
		},
		async post(req: IFavourite): Promise<any> {
			return ipcRenderer.invoke("favourites-post", req);
		},
	},
});

interface IFavourite {
	type: string;
	favourite?: string;
}
