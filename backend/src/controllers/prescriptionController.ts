import _ from 'lodash';
import { IPrescription } from '../preload';
import Prescription from '../models/Prescription';
import { database as sequelize } from '../configs/sqlite';
import { QueryTypes } from 'sequelize';

interface IPost extends IPrescription {}

const PrescriptionController: IPrescriptionController = {
    async post(event, args: IPost) {
        try {
            console.log(args);
            const treatment_detail_id = args.treatmentDetailId;
            let frequency = args.frequency;
            let start_date = args.start_date;
            let end_date = args.end_date;
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
                start_date: start_date,
                end_date: end_date,
                dosage: dosage,
                duration: duration
            });

            return {
                status: 200,
                message: `Treatment Detail ${treatment_detail_id} added prescription successfully`
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
            patientId: number;
        }
    ) {
        try {
            if (!args.multiple) {
                const TreatmentDetailId = args.treatmentDetailId;
                let prescriptions: any[] = await sequelize.query(
                    `SELECT p.id as id ,p.start_date,p.end_date,p.dosage,m.name,m.medicine_form,p.createdAt,p.updatedAt FROM Prescriptions as p INNER JOIN medicines as m on m.id = p.medicine_id  where p.treatmentDetailId = ${TreatmentDetailId}  `,
                    {
                        type: QueryTypes.SELECT
                    }
                );

                let allPrescriptionsParsed = prescriptions.map((item) => {
                    return {
                        ...item,
                        dosage: item.dosage ? JSON.parse(item.dosage) : {}
                    };
                });
                return {
                    status: 200,
                    data: allPrescriptionsParsed
                };
            } else if (args.multiple && args.patientId) {
                let prescriptions = await sequelize.query(
                    `SELECT p.id as id ,p.start_date,p.end_date,p.dosage,m.name,m.medicine_form,p.createdAt,p.updatedAt FROM Patients as pt INNER JOIN TreatmentDetails as td ON pt.id = td.patientId INNER JOIN Prescriptions as p on p.treatmentDetailId = td.id INNER JOIN medicines as m on m.id = p.medicine_id  WHERE pt.id = ${args.patientId}  `,
                    {
                        type: QueryTypes.SELECT
                    }
                );
				let allPrescriptionsParsed = prescriptions.map((item:any) => {
                    return {
                        ...item,
                        dosage: item.dosage ? JSON.parse(item.dosage) : {}
                    };
                });
                return {
                    status: 200,
                    data: allPrescriptionsParsed
                };
            } else {
                return { status: 500, message: 'Invalid code path' };
            }
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
                    id: prescriptionId
                }
            });

            if (deleteEntry === 1) {
                return {
                    status: 200,
                    message: `Deleted ${prescriptionId} successfully`
                };
            }

            return {
                status: 500,
                message: `Prescription ${prescriptionId} doesnt exist`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface IPrescriptionController {
    post: (event: any, args: any) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
}

export default PrescriptionController;
