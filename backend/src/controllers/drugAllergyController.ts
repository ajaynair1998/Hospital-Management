import _ from "lodash";
import DrugAllergy from "../models/Drug Allergy";
import { IDrugAllergy } from "../preload";

interface IPost extends IDrugAllergy {}

const drugAllergyController: IdrugAllergyController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const allergy = args.allergy;
			const details = args.details;

			await DrugAllergy.create({
				treatmentDetailId: 1,
				allergy: allergy,
				details: details,
			});

			return {
				status: 200,
				message: `Treatment Detail ${treatment_detail_id} updated Drug Allergy successfully`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async get(event: any, args: { treatmentDetailId: number }) {
		try {
			const TreatmentDetailId = args.treatmentDetailId;
			let allAllergies = await DrugAllergy.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
				order: [["createdAt", "DESC"]],
			});
			console.log(allAllergies);
			return {
				status: 200,
				data: allAllergies,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const complaintId = args.id;
			let deleteEntry = await DrugAllergy.destroy({
				where: {
					id: complaintId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${complaintId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Drug Allergy ${complaintId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IdrugAllergyController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default drugAllergyController;
