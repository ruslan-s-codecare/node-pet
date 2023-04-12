const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('Todo API', () => {
    it('should get all todos', (done) => {
        chai.request(app)
            .get('/todos')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get a todo by ID', (done) => {
        chai.request(app)
            .get('/todos/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id', 1);
                done();
            });
    });

    it('should return 404 for non-existing todo', (done) => {
        chai.request(app)
            .get('/todos/999')
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error', 'Todo not found');
                done();
            });
    });

    it('should create a new todo', (done) => {
        chai.request(app)
            .post('/todos')
            .send({ title: 'New Todo' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title', 'New Todo');
                expect(res.body).to.have.property('done', false);
                done();
            });
    });
});