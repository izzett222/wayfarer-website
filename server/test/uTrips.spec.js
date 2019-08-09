import app from "../../server";
import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { doesNotReject } from "assert";
import { users } from "../models/users";
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("user can view trips", () => {
  it("logged in user can view trips available", done => {
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
      .get("/api/v1/trips")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("unlogged user can not access resources", () => {
    chai
      .request(app)
      .get("/api/v1/trips")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
      });
  });
});
describe("user can view an individual trip", () => {
  it("logged in user can view trips available", done => {
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
      .get("/api/v1/trips/1")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("logged in user can view trips available", done => {
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
      .get("/api/v1/trips/145")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it("unlogged user can not access resources", () => {
    chai
      .request(app)
      .get("/api/v1/trips/1")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
      });
  });
});
describe("admin can create trips", () => {
  it("logged in admin  can create trips", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true,
      trip_date: "2019-12-23"
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );
    const trip = {
      seating_capacity: 30,
      bus_license_number: "rac 123",
      origin: "gisenyi",
      destination: "muhabura",
      fare: 123,
      trip_date: "2019-12-23"
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("token", token)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it("logged in admin  can create trips", done => {
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
    const trip = {
      bus_license_number: "rac 123",
      origin: "gisenyi",
      destination: "muhabura",
      fare: 123,
      date: "2019-12-23"
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("token", token)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});

describe("admin can cancel a trip", () => {
  it("logged in admin  can cancel a trips", done => {
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
      .patch("/api/v1/trips/2/cancel")
      .set("token", token)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("logged in admin  can't cancel  a trip if he doesn't give the necessary info ", done => {
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
      .patch("/api/v1/trips/2/cancel")
      .set("token", token)
      .send({ status: "" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it("logged in admin  can't cancel already cancelled  trip", done => {
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
      .patch("/api/v1/trips/2/cancel")
      .set("token", token)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it("admin can't cancel or create with a wrong token", done => {
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
      .patch("/api/v1/trips/1/cancel")
      .set("token", `${token} ndenjwenwjbfjaw`)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it("logged in admin  can't cancel already cancelled  trip", done => {
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
      .patch("/api/v1/trips/2/cancel")
      .set("token", token)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it("admin can't cancel or create with a wrong token", done => {
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
      .patch("/api/v1/trips/20/cancel")
      .set("token", `${token} ndenjwenwjbfjaw`)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});
