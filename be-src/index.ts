
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import { index } from "./../lib/algolia";
import { User, Pet, Auth } from "./models";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { authToken, createUser, authMiddelware, updateData, updatePassword } from "./controllers/users-controller";
import { createPet, bodyToIndex, updatePetProfile, findAllPets } from "./controllers/pets-controller";
import { json } from "sequelize";

const staticDirPath = path.resolve(__dirname, "../dist")


index.search("", {
  aroundLatLng: '40.71, -74.01',
  aroundRadius: 25000
}).then((res)=>{
  //console.log(res)
})

const app = express()
const port = process.env.PORT || 3003

app.use(express.json())
app.use(cors())

app.post("/test", (req, res) => {
  
})

// signup
app.post("/auth", async (req, res) => {

  const {email, password, fullname, location} = req.body

  const createdUser = await createUser(req.body)
  res.json(createdUser)
  
})


//signin
app.post("/auth/token", async (req, res) => {

  const {email, password} = req.body

  const authenticatedUser = await authToken(email, password)
  if(authenticatedUser == null){
    res.json({
      message: "null"
    })
  } else {
    res.json({
      authenticatedUser,
      message: "confirmed"
    })
  }
})


app.get("/me", authMiddelware ,async (req, res) => {
  const user = await User.findByPk(req._user.id)
  res.json(user)
})


app.post("/update-user", authMiddelware, async (req,res) => {

  const { userId, fullname, location } = req.body

  const newData = await updateData(req.body)
  res.json(newData)

})

app.post("/update-password", authMiddelware, async (req,res) => {

  const { userId, password } = req.body

  const newPassword = await updatePassword(req.body)
  res.json(newPassword)

})

app.post("/pets", authMiddelware, async (req, res) => {

  const { name, pictureURL, location, lat, lng } = req.body 
  const userId = req._user.id

  if(!req.body){
    res.status(400).json({
      message: "Los datos no están completos"
    })
  }

  const createdPet = await createPet(req.body, userId)
  res.json(createdPet)
})


app.get("/me/pets", authMiddelware, async (req, res) => {

  const userId = req._user.id

  const getMyPets = await findAllPets(userId)
  res.json(getMyPets)
})


app.get("/pets/:id", async (req, res) => {
  const pet = await Pet.findByPk(req.params.id)
  res.json(pet)
})


app.put("/pets/:id", async (req, res) => {

  const { name, pictureURL, location, lng, lat } = req.body

  const id = req.params.id

  const updatePet = await updatePetProfile(id, req.body)
  res.json(updatePet)

  const updatedData = await Pet.findByPk(id)

  const indexItem = await bodyToIndex(req.body, id)
  //console.log(indexItem)
  const algoliaRes = await index.partialUpdateObject(indexItem)
})


app.get("/mascotas-cerca-de", async (req, res) => {
  const { lat, lng } = req.query
  const {hits} = await index.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 10000
  })
  res.json(hits)
})


app.use(express.static(staticDirPath));

app.get("*", (req, res) =>{
  res.sendFile(staticDirPath + "/index.html")
})

//app.get("*", express.static(__dirname + '/public'))

app.listen(port, () => {
  console.log("todo está ok")
})



