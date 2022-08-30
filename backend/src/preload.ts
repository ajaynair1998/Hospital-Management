const { ipcRenderer, contextBridge } = require("electron");
import { DataTypes } from "sequelize";

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
	HistoryOfComplaintsApi: {
		async post(req: IHistoryOfComplaints): Promise<any> {
			return ipcRenderer.invoke("history-of-complaints-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("history-of-complaints-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("history-of-complaints-delete", req);
		},
	},
	DrugAllergyApi: {
		async post(req: IDrugAllergy): Promise<any> {
			return ipcRenderer.invoke("drug-allergy-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("drug-allergy-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("drug-allergy-delete", req);
		},
	},
	FollowUpApi: {
		async post(req: IFollowUp): Promise<any> {
			return ipcRenderer.invoke("follow-up-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("follow-up-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("follow-up-delete", req);
		},
	},
	InvestigationApi: {
		async post(req: IInvestigation): Promise<any> {
			return ipcRenderer.invoke("investigation-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("investigation-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("investigation-delete", req);
		},
	},
	TreatmentDoneApi: {
		async post(req: ITreatmentDone): Promise<any> {
			return ipcRenderer.invoke("treatment-done-post", req);
		},
		async get(req: { treatmentDetailId: number }): Promise<any> {
			return ipcRenderer.invoke("treatment-done-get", req);
		},
		async delete(req: { id: number }): Promise<any> {
			return ipcRenderer.invoke("treatment-done-delete", req);
		},
	},
	PatientApi: {
		async post(req: IPatient): Promise<any> {
			return ipcRenderer.invoke("patient-post", req);
		},
		async get(req: { patientId: number }): Promise<any> {
			return ipcRenderer.invoke("patient-get", req);
		},
		async delete(req: { patientId: number }): Promise<any> {
			return ipcRenderer.invoke("patient-delete", req);
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

export interface IHistoryOfComplaints {
	treatmentDetailId: number;
	complaint: string;
	details: string;
}

export interface IDrugAllergy {
	treatmentDetailId: number;
	allergies: string[];
}

export interface IFollowUp {
	treatmentDetailId: number;
	follow_up_text: string;
	follow_up_date: Date;
	purpose: string;
}

export interface IInvestigation {
	treatmentDetailId: number;
	file_data: string;
	file_name: string;
	file_type: string;
	file_size: number;
}

export interface ITreatmentDone {
	treatmentDetailId: number;
	treatment: string;
	duration: string;
	details: string;
}
export interface CountryType {
	code: string;
	label: string;
	phone: string;
	suggested?: boolean;
}

export interface IPatient {
	name: string;
	image: string;
	nationality: CountryType;
	age: number;
	date_of_birth: Date;
	gender: DataTypes.EnumDataType<string>;
	address: string;
	blood_group: string;
	phone_number: string;
	mobile_number: string;
	email: string;
	marital_status: string;
	occupation: string;
	doctor_name: string;
	referred_by?: string;
}
