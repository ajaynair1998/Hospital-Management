import ChiefComplaint from "../models/Chief Complaint";
import _ from "lodash";

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
				treatmentDetailId: 1,
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
	async get(event: any, args: { treatmentDetailId: number }) {
		try {
			const TreatmentDetailId = args.treatmentDetailId;
			let complaints = await ChiefComplaint.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
			});
			console.log(complaints);
			return {
				status: 200,
				data: complaints,
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
}

export default ChiefComplaintsController;
