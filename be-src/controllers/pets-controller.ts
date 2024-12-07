import { User, Auth, Pet } from "../models";
import { cloudinary } from "../../lib/cloudinary";
import { index } from "../../lib/algolia";

export async function createPet(petData, userId) {
    try {
        const { name, pictureURL, location, lng, lat } = petData

        const image = await cloudinary.uploader.upload(pictureURL,  {
            resource_type: "image",
            discard_original_filename: true,
            width: 1000
        })

        const petImageURL = image.secure_url
    
        const user = await User.findByPk(userId)
    
        if(user){
            const newPet = await Pet.create({
                name, 
                pictureURL: petImageURL,
                location,
                lat,
                lng,
                userId: user.get("id")
              })
    
            const algoliaRes = await index.saveObject({
                objectID: newPet.get("id"),
                name,
                pictureURL: petImageURL,
                location,
                _geoloc: {
                  lat,
                  lng
                }
              })
    
              return newPet
        } else {
            console.log("Usuario inexistente")
        }
    } catch (error) {
        console.log(error)
    }
}

export async function bodyToIndex (body, id?){
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

export async function updatePetProfile(id, updateData) {
    if(updateData.pictureDataURL){
        const image = await cloudinary.uploader.upload(updateData.pictureDataURL,
            {
                resource_type: "image",
                discard_original_filename: true,
                width: 1000
            }
        )
        const [pet] = await Pet.update({
            name: updateData.name,
            pictureURL: image.secure_url,
            location: updateData.location,
            _geoloc: {
                lng: updateData.lng,
                lat: updateData.lat
            }
        }, {
            where:{
                id: id
            }
        })
        image.secure_url

        return pet
    }
}

export async function findAllPets(id) {
    const pets = await Pet.findAll({
        where: {
          userId: id
        },
        include: [User]
      })

    return pets  
}