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
	PastMedicalHistoryApi: {
		async post(req: IPastMedicalHistory): Promise<any> {
			return ipcRenderer.invoke("past-medical-history-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("past-medical-history-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("past-medical-history-delete", req);
		},
	},
	PastSurgicalHistoryApi: {
		async post(req: IPastSurgicalHistory): Promise<any> {
			return ipcRenderer.invoke("past-surgical-history-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("past-surgical-history-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("past-surgical-history-delete", req);
		},
	},
	GeneralExaminationApi: {
		async post(req: IGeneralExamination): Promise<any> {
			return ipcRenderer.invoke("general-examination-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("general-examination-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("general-examination-delete", req);
		},
	},
	TreatmentPlanApi: {
		async post(req: ITreatmentPlan): Promise<any> {
			return ipcRenderer.invoke("treatment-plan-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("treatment-plan-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("treatment-plan-delete", req);
		},
	},
	LocalExaminationApi: {
		async post(req: ILocalExamination): Promise<any> {
			return ipcRenderer.invoke("local-examination-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("local-examination-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("local-examination-delete", req);
		},
	},
	DiagnosisApi: {
		async post(req: IDiagnosis): Promise<any> {
			return ipcRenderer.invoke("diagnosis-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("diagnosis-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("diagnosis-delete", req);
		},
	},
});

export interface IFavourite {
	type: string;
	favourite?: string;
}

export interface IChiefComplaint {
	treatmentDetailId: number;
	complaint: string;
	duration: string;
	details: string;
}

export interface IClinicalDiagnosis {
	treatmentDetailId: number;
	diagnosis: string;
	details: string;
}

export interface IPastMedicalHistory {
	treatmentDetailId: number;
	history: string;
	duration: string;
	details: string;
}

export interface IPastSurgicalHistory {
	treatmentDetailId: number;
	history: string;
	duration: string;
	details: string;
}

export interface IGeneralExamination {
	treatmentDetailId: number;
	bp: string;
	temperature: string;
	oxygen_saturation: string;
}
export interface ITreatmentPlan {
	treatmentDetailId: number;
	treatment: string;
	duration: string;
	details: string;
}

export interface ILocalExamination {
	treatmentDetailId: number;
	extraoral: string;
	intraoral: string;
}
export interface IDiagnosis {
	treatmentDetailId: number;
	diagnosis: string;
	details: string;
}
