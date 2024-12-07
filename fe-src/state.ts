
const API_BASE_URL = "http://localhost:3003";

const state = {
    data: {
        userId: "",
        fullName: "",
        email: "",
        password: "",
        userLocation: "",
        userLng: "",
        userLat: "",
        accesToken: "",
        petId: "",
        petName: "",
        petImgURL: "",
        petLocation: "",
        petLng: "",
        petLat: "",
    },
    listeners: [],


    getState() {
        return this.data;
    },

    signUp(){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/auth", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({email: cs.email, password: cs.password, fullname: cs.fullname, location: cs.location}),
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)

            cs.userId = data.id
            this.setState(cs)
            console.log(cs.userId)
            return data
        });
    },

    signIn(email, password){

        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/auth/token", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({email, password}),
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            
            const token = data.authenticatedUser
            cs.accessToken = token

            this.setState(cs)
            return data
        });
    },

    getUser(){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/me", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${cs.accessToken}`
            },
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)
            this.setState(cs)
            return data
        });
    },

     setUserData(email, password){
        const cs = this.getState()

        cs.email = email
        cs.password = password

        this.setState(cs)

        console.log(cs.email, cs.password)
    },

    setUserLocation(lng, lat){
        const cs = this.getState()
        
        cs.userLng = lng
        cs.userLat = lat

        this.setState(cs)
    },

    updateUserData(userId, fullName, location){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/update-user", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${cs.accessToken}`
            },
            body: JSON.stringify({userId, fullName, location}),
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)
            this.setState(cs)
            return data
        });
    },

    updatePassword(userId, password){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/update-password", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${cs.accessToken}`
            },
            body: JSON.stringify({userId, password}),
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)
            this.setState(cs)
            return data
        });
    },

    uploadPetName(petName){
        const cs = this.getState()

        cs.petName = petName

        this.setState(cs)
        console.log(cs.petName)
    }, 

    uploadPetPhoto(imgURL){
        const cs = this.getState()

        cs.petImageURL = imgURL

        this.setState(cs)
        console.log(cs.petImageURL)
    },

    uploadPetLocation(location){
        const cs = this.getState()

        cs.petLocation = location

        this.setState(cs)
        console.log(cs.petLocation)
    },

    uploadPetLngLat(lng, lat){
        const cs = this.getState()

        cs.petLng = lng
        cs.petLat = lat

        this.setState(cs)
        console.log(cs.petLng, cs.petLat)
    }, 

    reportPet(name, pictureURL, location, lat, lng){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/pets", {
            method: "post",
            headers: {
                authorization: `bearer ${cs.accessToken}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({name, pictureURL, location, lat, lng}),
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)
            this.setState(cs)
            return data
        });
    },

    getAllPets(){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/me/pets", {
            method: "GET",
            headers: {
                authorization: `bearer ${cs.accessToken}`,
                "content-type": "application/json",
            },
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)
            this.setState(cs)
            return data
        });
    },

    getOnePet(petId){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/pets/" + petId, {
            method: "GET",
            headers: {
                authorization: `bearer ${cs.accessToken}`,
                "content-type": "application/json",
            },
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)
            this.setState(cs)
            return data
        });
    },

    editReport(name, pictureURL, location, lng, lat){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/pets/" + 27, {
            method: "PUT",
            headers: {
                authorization: `bearer ${cs.accessToken}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({name, pictureURL, location, lng, lat}),
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)
            this.setState(cs)
            return data
        });
    },

    petsAround(lat, lng){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/mascotas-cerca-de?lat=" + lat + "&lng=" + lng, {
            method: "GET",
            headers: {
                authorization: `bearer ${cs.accessToken}`,
                "content-type": "application/json",
            },
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)
            this.setState(cs)
            return data
        });
    },

    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
        //localStorage.setItem("saved-play", JSON.stringify(newState));
    },

}

export { state }