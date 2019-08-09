import app from "../../server";
import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { doesNotReject } from "assert";
import { users } from "../models/users";
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("user can view bookings", () => {
  it("admin can view all bookings", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );

    chai
      .request(app)
      .get("/api/booking")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("user can book trips", () => {
  it("user can't book if he doesn't  gives full info", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );
    const book = {
      trid_id: ""
    };
    chai
      .request(app)
      .post("/api/booking")
      .send(book)
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it("user can book a trip", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );
    const book = {
      trip_id: 1
    };
    chai
      .request(app)
      .post("/api/booking")
      .send(book)
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it("user already  booked the trip", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );
    const book = {
      trip_id: 10
    };
    chai
      .request(app)
      .post("/api/booking")
      .send(book)
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it("user can book a trip", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );
    const book = {
      trip_id: 1
    };
    chai
      .request(app)
      .post("/api/booking")
      .send(book)
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
});

describe("user can delete his/her booking", () => {
  it("delete a booking", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );
    chai
      .request(app)
      .delete("/api/booking/7")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("can't delete a booking that doesn't exist", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );
    chai
      .request(app)
      .delete("/api/booking/15")
      .send()
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});
