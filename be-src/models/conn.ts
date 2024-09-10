import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://hjlukksn:N8xEfboepKGfQi8Z4w3e1r83HLBHZcxG@motty.db.elephantsql.com/hjlukksn')

/*async function main () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
main()*/


