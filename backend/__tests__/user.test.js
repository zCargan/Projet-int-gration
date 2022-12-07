const request = require('supertest');
const user = require('../models/User');
const app = require('../app.js');


describe('Login', () => {
    it("retourne 200 si l'authentification est correcte", async () => {
        const res = await request(app)
            .post('/user')
            .send({ email: 'a', mdp: 'a' });
        expect(res.statusCode).toEqual(200);
    })
});

describe('Username', () => {
    it("retourne ok si le username de l'utilisateur est disponible", async () => {
        const res = await request(app)
            .post('/username')
            .send({
                username: 'Logan',
                email: 'lgc.carlier@gmail.com',
                password: '$2a$10$uDAVJFDXHhIQWNcGArbPjujBFxCjQrTIysBGg6xYLJDc8ZUwiXXU6',
                confirmed: false,
                objectifs: [],
                city: ''
            });
        expect(res.statusCode).toEqual(200);
    })
});


describe('Inscription', () => {
    it("retourne 201 si le compte a bien été créer, 400 si une erreur est survenue", async () => {
        const res = await request(app)
            .post('/inscription')
            .send({
                username: 'Logan',
                email: 'lgc.carlier@gmail.com',
                password: '$2a$10$uDAVJFDXHhIQWNcGArbPjujBFxCjQrTIysBGg6xYLJDc8ZUwiXXU6',
                confirmed: false,
                objectifs: [],
                city: ''
            });
        expect(res.statusCode).toEqual(400);
        expect()
    })
});

describe('Username déja pris', () => {
    it("retourne true si le username de l'utilisateur est disponible, false si il est déja pris", async () => {
        const res = await request(app)
            .post('/username')
            .send({
                username: 'Logan',
                email: 'lgc.carlier@gmail.com',
                password: '$2a$10$uDAVJFDXHhIQWNcGArbPjujBFxCjQrTIysBGg6xYLJDc8ZUwiXXU6',
                confirmed: false,
                objectifs: [],
                city: ''
            });
        expect(res.text).toBe("false")
    })
});


describe('Username déja pris', () => {
    it("retourne true si le username de l'utilisateur est disponible, false si il est déja pris", async () => {
        const res = await request(app)
            .post('/username')
            .send({
                username: 'Mallory',
                email: 'lgc.carlier@gmail.com',
                password: '$2a$10$uDAVJFDXHhIQWNcGArbPjujBFxCjQrTIysBGg6xYLJDc8ZUwiXXU6',
                confirmed: false,
                objectifs: [],
                city: ''
            });
        expect(res.text).toBe("true")
    })
});


describe('Username déja pris', () => {
    it("retourne true si l'email de l'utilisateur est disponible, false si il est déja pris", async () => {
        const res = await request(app)
            .post('/username')
            .send({
                username: 'Logan',
                email: 'lgc.carlier@gmail.com',
                password: '$2a$10$uDAVJFDXHhIQWNcGArbPjujBFxCjQrTIysBGg6xYLJDc8ZUwiXXU6',
                confirmed: false,
                objectifs: [],
                city: ''
            });
        expect(res.text).toBe("false")
    })
});



describe('Username déja pris', () => {
    it("retourne true si l'email de l'utilisateur est disponible, false si il est déja pris", async () => {
        const res = await request(app)
            .post('/username')
            .send({
                username: 'Mallo',
                email: 'mallo.carlier@gmail.com',
                password: '$2a$10$uDAVJFDXHhIQWNcGArbPjujBFxCjQrTIysBGg6xYLJDc8ZUwiXXU6',
                confirmed: false,
                objectifs: [],
                city: ''
            });
        expect(res.text).toBe("true")
    })
});
