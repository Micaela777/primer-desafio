import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn"


export class User extends Model {}
  User.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    pictureURL: DataTypes.STRING,
    
  },{
    sequelize,
    modelName: "user"
  })
