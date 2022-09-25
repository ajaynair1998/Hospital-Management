import _ from "lodash";
import TreatmentDetail from "../models/Treatment Detail";

const TreatmentDetailsController: ITreatmentDetailsController = {
	async post(event, args: { patientId: number }) {
		try {
			let patientId = args.patientId;
			if (patientId) {
				await TreatmentDetail.create({
					patientId: patientId,
				});
				return {
					status: 200,
					message: "Created a new patient detail id",
				};
			} else {
				return {
					status: 200,
					message: `Invalid patient id`,
				};
			}
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
			return {
				status: 200,
				data: "not yet added the route",
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			//@ts-ignore
			let deleteEntry = await TreatmentDetail.destroy({
				where: {
					id: args.id,
				},
			});
			return {
				status: 500,
				message: `Treatment  ${""} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface ITreatmentDetailsController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default TreatmentDetailsController;
