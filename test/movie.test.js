const request = require('supertest');
const { app, server } = require('../server'); // ✅ Import both app and server
const chai = require('chai');
const expect = chai.expect;

describe("Movies API", () => {
    let token = '';
    let movieId = '';

    before(async () => {
        // Log in to get a token
        const res = await request(app)
            .post('/login')
            .send({ username: "testuser", password: "testpassword" });

        token = res.body.token;
    });

    it("should add a new movie", async () => {
        const res = await request(app)
            .post('/movies')
            .set("Authorization", token)
            .send({
                title: "Inception",
                director: "Christopher Nolan",
                genre: "Sci-Fi",
                year: 2010
            });

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("Movie added successfully!");
        movieId = res.body._id; // Store movie ID for later tests
    });

    after(async () => {
        // ✅ Close the server after tests to prevent hanging
        server.close();
    });
});
