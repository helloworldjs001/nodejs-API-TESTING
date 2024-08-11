const request = require("supertest")

const app = require("../server")


describe("Api Tests",()=>{


    let expect;

    before(async()=>{
        ({expect} = await import("chai"))
    })

    it("should retrive all resources",async()=>{

        const res = await request(app).get("/resource")
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an("object")
    })


    it("should create a new reource",async()=>{

        const newResource = {name:"Resource 3",type:"Type C"}

        const res = await request(app).post("/resource").send(newResource)

        expect(res.status).to.equal(201)
        expect(res.body).to.have.property("id")

    })


    it("should delete the resource by id",async()=>{

        const res = await request(app).delete("/resource/1")

        expect(res.status).to.equal(200)

        expect(res.body).to.have.property("message", "Resource deleted")

    })

    it("should return 404 when deleting an non-existing resource",async()=>{

        const res = await request(app).delete("/resource/80")

        expect(res.status).to.equal(404)

        expect(res.body).to.have.property("error", "Resource not found")

    })

    it("should access the secure resource with a valid auth token",async()=>{

        const res = await request(app).get("/secure-resource").set("Authorization", "Bearer valid_token")
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property("message", "Secure resource accessed")
    })


    it("should not access the secure resource with an invalid auth token",async()=>{

        const res = await request(app).get("/secure-resource").set("Authorization", "Bearer jhkdsksdsah")
        expect(res.status).to.equal(401)
        expect(res.body).to.have.property("error", "Authentication required")
    })


    it("should get a xml response",async()=>{

        const res = await request(app).get("/xml-response")

        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.include("application/xml")
        expect(res.text).to.have.include("<resource>")

    })


})