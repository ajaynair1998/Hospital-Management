import _ from 'lodash';
import moment from 'moment';
// import { Op } from "sequelize";
import { QueryTypes } from 'sequelize';
import { database as sequelize } from '../configs/sqlite';
import { checkIfNumber, getAge } from '../helpers';
import Patient from '../models/Patient';
import { IPatient } from '../preload';
interface IPost extends IPatient {}

const PatientController: IPatientController = {
    async post(event, args: IPost) {
        try {
            let dateAsString = moment(
                args.date_of_birth,
                'YYYY-MM-DD HH:mm:ss'
            ).toString();

            if (
                args.name == '' ||
                args.name === null ||
                args.name == undefined
            ) {
                throw new Error('Invalid Name');
            }

            let age = getAge(args.date_of_birth);
            // @ts-ignore
            let nationName = args.nationality.label;
            let nation = JSON.stringify(args.nationality);
            await Patient.create({
                name: args.name,
                nationality: nation,
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
                referred_by: args.referred_by
            });

            return {
                status: 200,
                message: `New Patient added successfully`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    },
    async put(event: any, args: IPost) {
        try {
            let dateAsString = moment(
                args.date_of_birth,
                'YYYY-MM-DD HH:mm:ss'
            ).toString();

            if (
                args.name == '' ||
                args.name === null ||
                args.name == undefined
            ) {
                throw new Error('Invalid Name');
            }

            let age = getAge(args.date_of_birth);
            // @ts-ignore
            let nationName = args.nationality && args.nationality.label;
            let nation = args.nationality && JSON.stringify(args.nationality);
            await Patient.update(
                {
                    name: args.name,
                    nationality: nation,
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
                    referred_by: args.referred_by
                },
                {
                    where: {
                        id: args.id
                    }
                }
            );

            return {
                status: 200,
                message: `patient updated successfully`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    },
    async get(event: any, args: { searchTerm: string; patientId: number }) {
        try {
            if (args.patientId) {
                const patientId = args.patientId;
                // this query is only for getting all the consultations to population the consultation table
                let patientWithTreatmentDetails = await sequelize.query(
                    `SELECT p.id as patientId,td.* from patients as p INNER JOIN treatmentdetails as td on p.id = td.patientId where p.id = ${patientId} AND p.id NOT NULL `,
                    {
                        type: QueryTypes.SELECT
                    }
                );
                return {
                    status: 200,
                    data: patientWithTreatmentDetails
                };
            } else if (!args.patientId) {
                let patients;
                if (args.searchTerm === '' || args.searchTerm === undefined) {
                    patients = await sequelize.query(
                        `SELECT * FROM PATIENTS ORDER BY createdAt LIMIT 10 `,
                        {
                            type: QueryTypes.SELECT
                        }
                    );
                } else {
                    let searchTermIsANumber = checkIfNumber(args.searchTerm);
                    if (searchTermIsANumber) {
                        patients = await sequelize.query(
                            `SELECT * FROM PATIENTS WHERE id = ${args.searchTerm} LIMIT 1`,
                            {
                                type: QueryTypes.SELECT
                            }
                        );
                    } else {
                        patients = await sequelize.query(
                            `SELECT * FROM PATIENTS WHERE  name LIKE  "${args.searchTerm}%" LIMIT 10 `,
                            {
                                type: QueryTypes.SELECT
                            }
                        );
                    }
                }
                patients = patients.sort((a: any, b: any) => {
                    if (a.name && b.name) {
                        return a.name[0] > b.name[0] ? 1 : -1;
                    } else {
                        return -1;
                    }
                });
                return {
                    status: 200,
                    data: patients
                };
            } else {
                return {
                    status: 501,
                    message: 'empty query somethings wrong',
                    data: []
                };
            }
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
                    id: PatientId
                }
            });

            if (deleteEntry === 1) {
                return {
                    status: 200,
                    message: `Deleted ${PatientId} successfully`
                };
            }

            return {
                status: 500,
                message: `Past Surgical History ${PatientId} doesnt exist`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface IPatientController {
    post: (event: any, args: IPatient) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
    put: (event: any, args: any) => Promise<any>;
}

export default PatientController;
