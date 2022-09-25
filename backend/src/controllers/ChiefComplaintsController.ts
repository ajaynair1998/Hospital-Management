import ChiefComplaint from "../models/Chief Complaint";
import _ from "lodash";
import { IChiefComplaint } from "../preload";
import { Op } from "sequelize";

interface IPost extends IChiefComplaint {}

const ChiefComplaintsController: IChiefComplaintsController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const details = args.details;
			const duration = args.duration;
			const complaint = args.complaint;

			// await Patient.create({
			// 	name: "ajay",
			// });

			// await TreatmentDetail.create({
			// 	patientId: 1,
			// });

			await ChiefComplaint.create({
				treatmentDetailId: treatment_detail_id,
				complaint: complaint,
				duration: duration,
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
			if (!args.multiple) {
				const TreatmentDetailId = args.treatmentDetailId;
				let complaints = await ChiefComplaint.findAll({
					where: {
						treatmentDetailId: TreatmentDetailId,
					},
					raw: true,
					order: [["createdAt", "DESC"]],
				});
				return {
					status: 200,
					data: complaints,
				};
			} else {
				let complaints = await ChiefComplaint.findAll({
					where: {
						treatmentDetailId: {
							[Op.in]: args.multipleIds,
						},
					},
					raw: true,
					order: [["createdAt", "DESC"]],
				});
				return {
					status: 200,
					data: complaints,
				};
			}
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const chiefComplaintId = args.id;
			let deleteEntry = await ChiefComplaint.destroy({
				where: {
					id: chiefComplaintId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${chiefComplaintId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Chief complaint ${chiefComplaintId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IChiefComplaintsController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default ChiefComplaintsController;
