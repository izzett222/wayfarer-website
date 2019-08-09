import app from "../../server";
import chai from "chai";
import chaiHttp from "chai-http";
import { doesNotReject } from "assert";
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("user can signin after authorization", () => {
  it("should sign up user when user gives all the required info", done => {
    const user = {
      email: "ishimweserg@gmail.com",
      password: "izzeddin"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
