import _ from "lodash";
import { IPrescription } from "../preload";
import Prescription from "../models/Prescription";

interface IPost extends IPrescription {}

const PrescriptionController: IPrescriptionController = {
	async post(event, args: IPost) {
		try {
			console.log(args);
			const treatment_detail_id = args.treatmentDetailId;
			let frequency = args.frequency;
			let from = args.from;
			let to = args.to;
			let dosage = args.dosage;
			let medicine_name = args.medicine_name;
			let medicine_id = args.medicine_id;
			let duration = args.duration;

			dosage = JSON.stringify(args.dosage);

			await Prescription.create({
				treatmentDetailId: treatment_detail_id,
				medicine_name: medicine_name,
				medicine_id: medicine_id,
				frequency: frequency,
				from: from,
				to: to,
				dosage: dosage,
				duration: duration,
			});

			return {
				status: 200,
				message: `Treatment Detail ${treatment_detail_id} added prescription successfully`,
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
			let prescriptions = await Prescription.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
				order: [["createdAt", "DESC"]],
			});
			let allPrescriptionsParsed = prescriptions.map((item) => {
				return {
					...item,
					dosage: item.dosage ? JSON.parse(item.dosage) : {},
				};
			});
			return {
				status: 200,
				data: prescriptions,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const prescriptionId = args.id;
			let deleteEntry = await Prescription.destroy({
				where: {
					id: prescriptionId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${prescriptionId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Prescription ${prescriptionId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IPrescriptionController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default PrescriptionController;
