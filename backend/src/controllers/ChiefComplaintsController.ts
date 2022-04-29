import ChiefComplaint from "../models/Chief Complaint";
import TreatmentDetail from "../models/Treatment Detail";
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
};

interface IChiefComplaintsController {
	post: (event: any, args: any) => Promise<any>;
}

export default ChiefComplaintsController;
