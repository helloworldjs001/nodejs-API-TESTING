const express = require('express')

const app = express()


// to parse the request body
app.use(express.json())



// sample dataset
const resources = {
    1: {name:"Resource 1", type:"Type A"},
    2: {name:"Resource 2", type:"Type B"}
}


app.get("/resource",(req,res)=>{
    res.status(200).json(resources)
})


app.post("/resource",(req,res)=>{

    const newResource = req.body
    const resourceId = Object.keys(resources).length + 1 
    resources[resourceId] = newResource
    res.status(201).json({id:resourceId})

})


app.delete("/resource/:id",(req,res)=>{

    const resourceId = req.params.id

    if(resources[resourceId]){
        delete resources[resourceId]
        res.status(200).json({"message": "Resource deleted"})
    }else{
        res.status(404).json({"error": "Resource not found"})
    }

})


app.get("/secure-resource",(req,res)=>{

    const authHeader = req.headers["authorization"]

    if(authHeader === "Bearer valid_token"){
        res.status(200).json({"message": "Secure resource accessed"})
    }else
    {
        res.status(401).json({"error": "Authentication required"})
    }

})


app.get("/xml-response",(req,res)=>{

    const xml = `<resource>
        <name>XML RESPONESE</name>
    </resource>`

    res.set("Content-Type", "application/xml")

    res.status(200).send(xml)

})



app.listen(3100,()=>{
    console.log("server listening on 3100");
})



module.exports = app