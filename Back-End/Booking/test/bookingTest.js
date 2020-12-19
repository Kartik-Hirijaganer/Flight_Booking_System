let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../booking");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('GET /booking/all', () => {
  it("It should GET all the bookings", (done) => {
    chai.request(server)
      .get("/booking/all")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
      done();
      });
  });

  it("It should NOT GET all the bookings", (done) => {
    chai.request(server)
        .get("/flight")
        .end((err, response) => {
            response.should.have.status(404);
        done();
        });
  });

  /**
    * Test GET by userId
    */

   describe("GET /booking/allbookings/:userId", () => {
    it("It should GET all bookings done by that user", (done) => {
        const userId = '5fd643caa7bd1225389aba3e';
        chai.request(server)                
            .get("/booking/allbookings/" + userId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
            done();
            });
    });
  });

  /**
   * Test DELETE by flightName route
   */

  describe("DELETE /booking/cancel/:bookingId", () => {
    it("It should DELETE an existing booking", (done) => {
        const bookingId = "500";
        chai.request(server)                
            .delete("/booking/cancel/" + bookingId)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });
    });
  });


});
