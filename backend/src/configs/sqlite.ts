import sequelize from "sequelize";
import path from "path";
const { Sequelize } = sequelize;

const sequelizeDB = new Sequelize({
	dialect: "sqlite",
	storage: path.resolve(__dirname, "../../storage/development.sqlite"),
});

// MOST PROBABLY WILL THROW ERROR IN SQLITE QUERY.JS IN NODE MODULES IF TABLE IN IMPOSSIBLE TO ALTER ie LIKE
// TRYING TO REMOVE A COLOUMN WHICH IS CURRENTLY USED BY A RECORD
(async (): Promise<any> => {
	try {
		// COPY AND PASTE THIS FUNCTION TO DEBUG SOMEWHERE BY CREATING DATA OR SOMETHING
		await sequelizeDB.sync({ alter: false, force: false });
		console.log("Syncronised DB");
	} catch (err: any) {
		console.log("Failed to syncronize");
		console.log(err);
	}
})();

export { sequelizeDB as database };
