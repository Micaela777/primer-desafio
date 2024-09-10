import { User } from "./user";
import { Pet } from "./pets";
import { Auth } from "./auth";

User.hasMany(Pet)
Pet.belongsTo(User)

export { User, Pet, Auth }