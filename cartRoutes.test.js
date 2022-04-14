"use strict";

const request = require("supertest");

const app = require("./app");
const db = require("./fakeDb");

let popsicle = { name: "popsicle", price: 1.45 };
let cheerios = { name: "cheerios", price: 3.40 };

beforeEach(function ()
{
  db.items = [popsicle];
});

afterEach(function () {
  db.items = [];
});



/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function () {
  it("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [popsicle] });
  });
})

/** POST /items - add item to list; return item */

describe("POST /items", function() {
  it("Adds item to shopping list", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send(cheerios);
    debugger
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({added: cheerios});
    expect(db.items.length).toEqual(2);
  });
});


/** GET /items/:name - returns item */

describe("GET /items/:name", function () {
  it("Gets item from items using name", async function () {
    const resp = await request(app).get(`/items/popsicle`);

    expect(resp.body).toEqual(popsicle);
  });
})
