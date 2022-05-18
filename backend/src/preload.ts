const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	notificationApi: {
		sendNotification(message: any) {
			ipcRenderer.send("notify", message);
		},
	},
	favouritesApi: {
		async get(req: { category: string }): Promise<any> {
			return ipcRenderer.invoke("favourites-get", req);
		},
		async post(req: IFavourite): Promise<any> {
			return ipcRenderer.invoke("favourites-post", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("favourites-delete", req);
		},
	},
	ChiefComplaintsApi: {
		async post(req: IChiefComplaint): Promise<any> {
			return ipcRenderer.invoke("chief-complaints-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("chief-complaints-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("chief-complaints-delete", req);
		},
	},
	ClinicalDiagnosisApi: {
		async post(req: IClinicalDiagnosis): Promise<any> {
			return ipcRenderer.invoke("clinical-diagnosis-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("clinical-diagnosis-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("clinical-diagnosis-delete", req);
		},
	},
});

interface IFavourite {
	type: string;
	favourite?: string;
}

interface IChiefComplaint {
	treatmentDetailId: number;
	complaint: string;
	duration: string;
	details: string;
}

interface IClinicalDiagnosis {
	treatmentDetailId: number;
	diagnosis: string;
	details: string;
}
