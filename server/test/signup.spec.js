import app from "../../server";
import chai from "chai";
import chaiHttp from "chai-http";
import { doesNotReject } from "assert";
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;
describe("it should sign the user into the user object", () => {
  it("should sign up user when user gives all the required info and is not logged in", done => {
    const user = {
      first_name: "izzeddin",
      last_name: "ishimwe",
      email: "ishimweserg@gmail.com",
      password: "izzeddin",
      is_admin: false
    };
    chai
      .request(app)
      .post("/api/auth/signup")
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it("should not signup users who gave emails which already exist", done => {
    const user = {
      first_name: "izzeddin",
      last_name: "ishimwe",
      email: "ishimweserg@gmail.com",
      password: "izzeddin",
      is_admin: false
    };
    chai
      .request(app)
      .post("/api/auth/signup")
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  describe("user ho input wrong data won't be signed up", () => {
    it("should not signup users who gave empty string", done => {
      const user = {
        first_name: "",
        last_name: "ishimwe",
        email: "ishimweserg@gmail.com",
        password: "izzeddin",
        is_admin: false
      };
      chai
        .request(app)
        .post("/api/auth/signup")
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
});
