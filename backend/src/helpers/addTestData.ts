import Patient from "../models/Patient";
import TreatmentDetail from "../models/Treatment Detail";

async function addTestData() {
	try {
		await Patient.create({
			name: "ajay",
		});

		await TreatmentDetail.create({
			patientId: 1,
		});
	} catch (err) {
		console.log(err);
	}
}

addTestData();
