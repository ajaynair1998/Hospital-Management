import _ from "lodash";
import moment from "moment";
// import { Op } from "sequelize";
import { QueryTypes } from "sequelize";
import { database as sequelize } from "../configs/sqlite";
import { getAge } from "../helpers";
import Patient from "../models/Patient";
import { IPatient } from "../preload";
interface IPost extends IPatient {}

const PatientController: IPatientController = {
	async post(event, args: IPost) {
		try {
			let dateAsString = moment(
				args.date_of_birth,
				"YYYY-MM-DD HH:mm:ss"
			).toString();

			let age = getAge(args.date_of_birth);

			let nationName = args.nationality.label;
			let newPatient = await Patient.create({
				name: args.name,
				nationality: nationName,
				age: age,
				date_of_birth: dateAsString,
				gender: args.gender,
				address: args.address,
				blood_group: args.blood_group,
				phone_number: args.phone_number,
				mobile_number: args.mobile_number,
				email: args.email,
				marital_status: args.marital_status,
				occupation: args.occupation,
				doctor_name: args.doctor_name,
				referred_by: args.referred_by,
			});
			console.log(
				"🚀 ~ file: patientController.ts ~ line 39 ~ post ~ newPatient",
				newPatient
			);

			return {
				status: 200,
				message: `New Patient added successfully in db`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async get(event: any, args: { searchTerm: string }) {
		try {
			let patients = await sequelize.query(
				`SELECT * FROM PATIENTS WHERE id = "${args.searchTerm}" OR name LIKE  "%${args.searchTerm}%"`,
				{
					type: QueryTypes.SELECT,
				}
			);
			console.log(
				"🚀 ~ file: patientController.ts ~ line 57 ~ get ~ patients",
				patients
			);
			return {
				status: 200,
				data: patients,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const PatientId = args.id;
			let deleteEntry = await Patient.destroy({
				where: {
					id: PatientId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${PatientId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Past Surgical History ${PatientId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IPatientController {
	post: (event: any, args: IPatient) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default PatientController;
