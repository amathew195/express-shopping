const request = require('supertest');
const app = require('./app');
let db = require('./fakeDb');

beforeEach(function () {
  let popsicle = { name: "popsicle", price: 1.45 };
  let cheerios = { name: "cheerios", price: 3.43 };

  db.Items.add(popsicle);
  db.Items.add(cheerios);
});

afterEach(function () {
  db.Items.deleteAll();
});

describe('GET /items', function () {

  it('Gets a list of all items', async function () {
    const resp = await request(app).get('/items');
    expect(resp.body).toEqual({
      items: [
        { name: "popsicle", price: '1.45' },
        { name: "cheerios", price: '3.43' }
      ]
    });
  });
});

describe('POST /items', function () {
  it('Adds an item to the list', async function () {
    const resp = await request(app)
      .post('/items')
      .send({
        "name": "toast",
        "price": 1.00
      });
    debugger;
    expect(resp.body).toEqual({
      added: {
        name: 'toast',
        price: '1.00'
      }
    });
  });
});


describe('GET /items/:name', function () {
  it('Gets an item', async function () {
    const resp = await request(app).get('/items/popsicle');
    expect(resp.body).toEqual({ name: "popsicle", price: '1.45' },
    );
  });
});


