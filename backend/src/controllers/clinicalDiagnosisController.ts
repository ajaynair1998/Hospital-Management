import ClinicalDiagnosis, {
	IClinicalDiagnosis,
} from "../models/Clinical Diagnosis";
import _ from "lodash";

interface IPost extends IClinicalDiagnosis {}

const ClinicalDiagnosisController: IClinicalDiagnosisController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const diagnosis = args.diagnosis;
			const details = args.details;

			await ClinicalDiagnosis.create({
				treatmentDetailId: 1,
				diagnosis: diagnosis,
				details: details,
			});

			return {
				status: 200,
				message: `Treatment Detail ${treatment_detail_id} updated chief complaint successfully`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async get(
		event: any,
		args: {
			treatmentDetailId: number;
			multiple: boolean;
			multipleIds: number[];
		}
	) {
		try {
			const TreatmentDetailId = args.treatmentDetailId;
			let allDiagnosis = await ClinicalDiagnosis.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
				order: [["createdAt", "DESC"]],
			});
			console.log(allDiagnosis);
			return {
				status: 200,
				data: allDiagnosis,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const diagnosisId = args.id;
			let deleteEntry = await ClinicalDiagnosis.destroy({
				where: {
					id: diagnosisId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${diagnosisId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Clinical Diagnosis ${diagnosisId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IClinicalDiagnosisController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default ClinicalDiagnosisController;
