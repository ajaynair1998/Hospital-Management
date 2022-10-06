import _ from 'lodash';
import DrugAllergy from '../models/Drug Allergy';
import { IDrugAllergy } from '../preload';

import { database as sequelize } from '../configs/sqlite';
import { QueryTypes } from 'sequelize';

interface IPost extends IDrugAllergy {}

const drugAllergyController: IdrugAllergyController = {
    async post(event, args: IPost) {
        try {
            const treatment_detail_id = args.treatmentDetailId;
            let allergies = args.allergies;
            let allergiesAsString = JSON.stringify(allergies);

            await DrugAllergy.create({
                treatmentDetailId: treatment_detail_id,
                allergy: allergiesAsString
            });

            return {
                status: 200,
                message: `Treatment Detail ${treatment_detail_id} updated Drug Allergy successfully`
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
                let allAllergies = await DrugAllergy.findAll({
                    where: {
                        treatmentDetailId: TreatmentDetailId
                    },
                    raw: true,
                    order: [['createdAt', 'DESC']]
                });
                let allAllergiesParsed = allAllergies.map((item) => {
                    return {
                        ...item,
                        allergy: JSON.parse(item.allergy)
                    };
                });
                return {
                    status: 200,
                    data: allAllergiesParsed
                };
            } else if (args.multiple && args.patientId) {
                let allAllergies = await sequelize.query(
                    `SELECT da.* from Patients as p INNER JOIN TreatmentDetails as td ON p.id = td.patientId INNER JOIN DrugAllergies as da on da.treatmentDetailId = td.id WHERE 
					p.id = ${args.patientId} `,
                    {
                        type: QueryTypes.SELECT
                    }
                );
                let allAllergiesParsed = allAllergies.map((item: any) => {
                    return {
                        ...item,
                        allergy: JSON.parse(item.allergy)
                    };
                });
                return {
                    status: 200,
                    data: allAllergiesParsed
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
            const complaintId = args.id;
            let deleteEntry = await DrugAllergy.destroy({
                where: {
                    id: complaintId
                }
            });

            if (deleteEntry === 1) {
                return {
                    status: 200,
                    message: `Deleted ${complaintId} successfully`
                };
            }

            return {
                status: 500,
                message: `Drug Allergy ${complaintId} doesnt exist`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface IdrugAllergyController {
    post: (event: any, args: any) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
}

export default drugAllergyController;
