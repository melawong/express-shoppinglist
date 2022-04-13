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