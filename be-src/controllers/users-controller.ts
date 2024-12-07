import { User, Auth, Pet } from "../models";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

const SECRET = "abcd1234"

function getSHA256ofString (text: string){
    return crypto.createHash('sha256').update(text).digest('hex')
  }

export async function createUser(userData){

    const {email, password, fullname, location} = userData

    if (!email || !password) {
        throw new Error('Se requiere de un email y contraseña.');
    } 

    const [user, userCreated] = await User.findOrCreate({
        where: { email: email },
        defaults: {
          email,
          fullname,
          location
        }
    })
    const [auth, authCreated] = await Auth.findOrCreate({
        where: { user_id: user.get("id") },
        defaults: {
          email,
          password: getSHA256ofString(password),
          user_id: user.get("id")
        }
      })

    return auth
}

export async function authToken(email, password) {
    
  const passwordHasheado = getSHA256ofString(password)

  try {
    const auth = await Auth.findOne({
      where: {
        email,
        password: passwordHasheado
      }
    })
    
    const token = jwt.sign({ id: auth.get("user_id")}, SECRET)
    
    if(auth){
      return token
    } else {
      throw new Error("El usuario con el correo electrónico que estás ingresando no existe.")
    }
  } catch (error) {
    console.log(error)
  }
  
}

export async function authMiddelware(req, res, next){

  const token = req.headers.authorization.split(" ")[1]
  
  try{
    const data = jwt.verify(token, SECRET)
    req._user = data
    next()
  }catch(e){
    res.status(401).json({
      error: "true"
    })
  }
}

export async function updateData(newData) {
  
  const {userId, fullName, location} = newData


  const updatedUser = User.update(newData, {
    where: {
      id: userId
    }
  })

  return updatedUser
}

export async function updatePassword(newPassword) {

  const {userId, password} = newPassword

  const update = {
    password: getSHA256ofString(password)
  }

  const updatedPassword = Auth.update(update, {
    where: {
      id: userId
    }
  })

  return updatedPassword
}
