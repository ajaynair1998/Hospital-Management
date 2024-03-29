import _ from 'lodash';
import Medicine from '../models/Medicine';
import { database as sequelize } from '../configs/sqlite';
import Prescription from '../models/Prescription';

const MedicineController: IMedicineController = {
    async post(
        event,
        args: {
            name: string;
            strength: string;
            medicine_form: string;
            description: string;
        }
    ) {
        try {
            const name = args.name;
            const strength = args.strength;
            const medicineForm = args.medicine_form;
            const description = args.description;

            await Medicine.create({
                name: name,
                strength: strength,
                medicine_form: medicineForm,
                description: description
            });

            return {
                status: 200,
                message: `Added new Medicine successfully`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    },
    async get(event: any, args: {}) {
        try {
            let allMedicines = await Medicine.findAll({
                where: {},
                raw: true,
                order: [['createdAt', 'DESC']]
            });
            return {
                status: 200,
                data: allMedicines
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    },
    async delete(event: any, args: { id: number }) {
        try {
            const medicineId = args.id;
            const transaction_t1 = await sequelize.transaction();

            if (args.id) {
                // @ts-ignore
                let deletePrescriptionWithCurrentMedicine =
                    await Prescription.destroy({
                        where: {
                            medicine_id: args.id
                        },
                        transaction: transaction_t1
                    });
                let deleteEntry = await Medicine.destroy({
                    where: {
                        id: medicineId
                    },

                    transaction: transaction_t1
                });

                await transaction_t1.commit();

                if (deleteEntry === 1) {
                    return {
                        status: 200,
                        message: `Deleted ${medicineId} successfully`
                    };
                }

                return {
                    status: 500,
                    message: `Medicine ${medicineId} doesnt exist`
                };
            } else {
                transaction_t1.rollback();
                return {
                    status: 500,
                    message: `Medicine ${medicineId} doesnt exist`
                };
            }
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface IMedicineController {
    post: (event: any, args: any) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
}

export default MedicineController;
