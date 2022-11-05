import sequelize from 'sequelize';
import path from 'path';
const { Sequelize } = sequelize;

const sequelizeDB = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../storage/development.sqlite')
    // logging output actions to the console
    // logging: true
});

// MOST PROBABLY WILL THROW ERROR IN SQLITE QUERY.JS IN NODE MODULES IF TABLE IN IMPOSSIBLE TO ALTER ie LIKE
// TRYING TO REMOVE A COLOUMN WHICH IS CURRENTLY USED BY A RECORD
(async (): Promise<any> => {
    try {
        // COPY AND PASTE THIS FUNCTION TO DEBUG SOMEWHERE BY CREATING DATA OR SOMETHING
        // SOMETIMES EVEN ADDING DEBUG DATA WILL PRODUCE ERROR IF ALTER IS TRUE SINCE WE ARE EXPORTING THE DB FROM HERE !!YET TO FIND OUT WHY
        // TO MAKE SURE THIS WORKS
        // IF YOU WANT TO ADD NEW TABLES
        // ->ADD alter : true
        // -> DELETE THE CURRENT DB
        // ->NPM RUN DB
        // ->ADD alter : false
        // npm run debug-data
        await sequelizeDB.sync({ alter: false, force: false });
        console.log('\x1b[32m%s\x1b[0m', 'Syncronised DB');
    } catch (err: any) {
        console.log('\x1b[31m%s\x1b[0m', 'Failed to syncronize');
        console.log(err);
    }
})();

export { sequelizeDB as database };
