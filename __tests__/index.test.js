const request = require('supertest');

beforeEach(() => {
    jest.resetModules();
});

describe('Index Route Tests', () => {

    describe('/ route', () => {

        it('should respond successfully to get request', async () => {

            const app = require('../app');
            jest.mock('../services/navigation');

            const res = await request(app).get('/');

            expect(res.statusCode).toBe(200);

        });

        it('should include response from navigation service in own response', async () => {

            const app = require('../app');
            jest.mock('../services/navigation', () => ({
                getHeader: () => '<nav>awesome header</nav>'
            }));

            const res = await request(app).get('/');

            expect(res.text).toContain('awesome header');

        });
    });

});
