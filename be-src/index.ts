
import * as express from "express";
import * as path from "path";
import { index } from "./../lib/algolia";
import { User, Pet, Auth } from "./models";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

const staticDirPath = path.resolve(__dirname, "../dist")



/*index.saveObject({
  objectID: "1",
  name: "Dulce",
  pictureURL: "Una imagen",
    _geoloc: {
      lat: 40.639751,
      lng: -73.778925
    }
}).then((res)=>{
  console.log(res)
}).catch((e) => {
  console.log(e)
})*/

index.search("", {
  aroundLatLng: '40.71, -74.01',
  aroundRadius: 25000
}).then((res)=>{
  //console.log(res)
})

const SECRET = "abcd1234"

function getSHA256ofString (text: string){
  return crypto.createHash('sha256').update(text).digest('hex')
}

const app = express()
const port = process.env.PORT || 3003

app.use(express.json())


/*app.get("/test", authMiddelware ,async (req, res) => {
  const user = await User.create({
    fullname: "micapx"
  })
  const pet = await Pet.create({
    name: "Aguinaldo",
    pictureURL: "Inserte imagen",
    location: "Sepa Judas nuevamente",
    userId: 1
  })
 const pets = await Pet.findAll({
  where: {
    userId: 1
  },
  include: [User],
 })
  res.json(pets)
})*/

/*app.post("/auth", async (req, res) => {
    const user = req.body
    res.json(user)
})*/

app.get("/test", (req, res) => {

  res.json({true: "ok"})
})

// signup
app.post("/auth", async (req, res) => {

  const { fullname, email, password, bio, pictureURL} = req.body

  const [user, userCreated] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      fullname,
      email,
      bio,
      pictureURL
    }
  })

  const [auth, authCreated] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    defaults: {
      email,
      password: getSHA256ofString(req.body.password),
      user_id: user.get("id")
    }
  })
  //console.log({user, auth})
  res.json(auth)
})


//signin
app.post("/auth/token", async (req, res) => {
  const {email, password} = req.body
  const passwordHasheado = getSHA256ofString(req.body.password)
  const auth = await Auth.findOne({
    where: {
      email,
      password: passwordHasheado
    }
  })
  
  const token = jwt.sign({ id: auth.get("user_id")}, SECRET)
  if(auth){
    res.json({
      token
    })
  } else {
    res.status(400).json({
      error: "email or pass incorrect"
    })
  }
})


function authMiddelware(req, res, next){
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


app.get("/me", authMiddelware ,async (req, res) => {
  const user = await User.findByPk(req._user.id)
  res.json(user)
})


app.post("/pets", authMiddelware, async (req, res) => {
  const pet = await Pet.create({
    ...req.body,
    userId: req._user.id
  })
  res.json(pet)

  const algoliaRes = await index.saveObject({
    objectID: pet.get("id"),
    name: pet.get("name"),
    _geoloc: {
      lat: pet.get("lat"),
      lng: pet.get("lng")
    }
  })
})


app.get("/me/pets", authMiddelware, async (req, res) => {
  const pets = await Pet.findAll({
    where: {
      userId: req._user.id
    },
    include: [User]
  })
  res.json(pets)
})


app.get("/pets/:id", async (req, res) => {
  const pet = await Pet.findByPk(req.params.id)
  res.json(pet)
})


function bodyToIndex (body, id?){
  const response:any = {}
  if(body.name){
    response.name = body.name
  }
  if(body.pictureURL){
    response.pictureURL = body.pictureURL
  }
  if(body.location){
    response.location = body.location
  }
  if(body.lat && body.lng){
    response._geoloc = {
      lat: body.lat,
      lng: body.lng
    }
  }
  if(id){
    response.objectID = id
  }
  return response
}


app.put("/pets/:id", async (req, res) => {
  const [pet] = await Pet.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  res.json(pet)

  const updatedData = await Pet.findByPk(req.params.id)

  const indexItem = bodyToIndex(req.body, req.params.id)
  //console.log(indexItem)
  const algoliaRes = await index.partialUpdateObject(indexItem)
})


app.get("/comercios-cerca-de", async (req, res) => {
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



