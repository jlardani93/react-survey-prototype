const expect = require('expect')
const request = require('supertest')
const { setupDatabase, teardownDatabase } = require('./setup.js');
const { app } = require('./../../../server/app.js');

beforeAll(async (done) => {
  await setupDatabase().resolve();
  done();
});

afterAll(() => {
  return teardownDatabase()
});

it('1 + 2 to equal 3', () => {
  expect( 1 + 2 ).toBe(3);
})

it('1 + 3 to equal 4', () => {
  expect( 1 + 3 ).toBe(4);
})

describe('POST /api/login', () => {
  it('should retrieve admin', done => {
    const params = `username=admin&password=admin`;
    request(app)
    .post('/api/login')
    .send(params)
    .expect(200)
    .expect( res => {
      console.log('res:', res.body.params);
      expect(res.body.username).toEqual('admin');
    })
    .end((err, res) => {
      if (err) return done(err);
      expect(res.role).toBe('admin');
      done();
    })
  })
})

describe('POST /api/createUser', () => {
  it('should do something', done => {
    const params = `username=testUsername&password=testPassword&role=testRole&email=testEmail`;

    request(app)
    .post('/api/createUser')
    .send(params)
    .expect(200)
    .expect( res => {
      expect(res.body.params).toEqual(params);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
    })
    done();
  })
})
