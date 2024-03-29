import _ from 'lodash';
import Diagnosis from '../models/Diagnosis';
import { IDiagnosis } from '../preload';

import { database as sequelize } from '../configs/sqlite';
import { QueryTypes } from 'sequelize';
interface IPost extends IDiagnosis {}

const DiagnosisController: IDiagnosisController = {
    async post(event, args: IPost) {
        try {
            const treatment_detail_id = args.treatmentDetailId;
            const diagnosis = args.diagnosis;
            const details = args.details;

            await Diagnosis.create({
                treatmentDetailId: treatment_detail_id,
                diagnosis: diagnosis,
                details: details
            });

            return {
                status: 200,
                message: `Treatment Detail ${treatment_detail_id} updated Diagnosis successfully`
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
                let allDiagnosis = await Diagnosis.findAll({
                    where: {
                        treatmentDetailId: TreatmentDetailId
                    },
                    raw: true,
                    order: [['createdAt', 'DESC']]
                });
                return {
                    status: 200,
                    data: allDiagnosis
                };
            } else if (args.multiple && args.patientId) {
                let allDiagnosis = await sequelize.query(
                    `SELECT d.* from Patients as p INNER JOIN TreatmentDetails as td ON p.id = td.patientId INNER JOIN Diagnoses as d on d.treatmentDetailId = td.id WHERE 
					p.id = ${args.patientId} `,
                    {
                        type: QueryTypes.SELECT
                    }
                );
                return {
                    status: 200,
                    data: allDiagnosis
                };
            } else {
                return {
                    status: 500,
                    message: 'Invalid code path'
                };
            }
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    },
    async delete(event: any, args: { id: number }) {
        try {
            const diagnosisId = args.id;
            let deleteEntry = await Diagnosis.destroy({
                where: {
                    id: diagnosisId
                }
            });

            if (deleteEntry === 1) {
                return {
                    status: 200,
                    message: `Deleted ${diagnosisId} successfully`
                };
            }

            return {
                status: 500,
                message: `Diagnosis${diagnosisId} doesnt exist`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface IDiagnosisController {
    post: (event: any, args: any) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
}

export default DiagnosisController;
