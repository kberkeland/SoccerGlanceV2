let app = require('../server');
let testServer = require('supertest');

test(`Users should be able to logout`, () => {
    return testServer(app).post('/api/user/logout').then((response) => {
        expect(response.statusCode).toBe(200);
    });
});

test(`Sportmonks router GET statement`, () => {
    let agent = testServer.agent(app);

    return agent.post('/api/sportmonks/1').send({username: 'kye', password: 'tuna'}).then((response) => {
        expect(response.data).not.toBeUndefined();
    });

});