let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../flight");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('flight API', () => {
  /**
   * Test GET all flights route
   */
  describe('GET /flights', () => {
    it("It should GET all the flights", (done) => {
      chai.request(server)
        .get("/flights")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
        done();
        });
    });

    it("It should NOT GET all the flights", (done) => {
      chai.request(server)
          .get("/flight")
          .end((err, response) => {
              response.should.have.status(404);
          done();
          });
    });

  });

   /**
    * Test GET by flightName route
    */

  describe("GET /flight/:flightName", () => {
    it("It should GET a flight by flightName", (done) => {
        const flightName = 'AI-100';
        chai.request(server)                
            .get("/flight/" + flightName)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('airLine');
                response.body.should.have.property('flightName');
                response.body.should.have.property('source');
                response.body.should.have.property('destination');
                response.body.should.have.property('fare');
            done();
            });
    });
  });

  /**
   * Test GET flights by source and destination
   */
  describe('GET /flights/:source/:destination', () => {
    it("It should GET all the flights", (done) => {
      const source = 'bangalore';
      const destination = 'gujrat'
      chai.request(server)
        .get(`/flights/${source}/${destination}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
        done();
        });
    });
  });

  /**
   * Test POST route
   */
  describe("POST /flight/add", () => {
    it("It should POST a new flight", (done) => {
        const flight = {
            airLine: "Go Air",
            flightName: "GA-300",
            source: "bangalore",
            destination: "ahmendabad",
            fare: 5000
        };
        chai.request(server)                
            .post("/flight/add")
            .send(flight)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('airLine').eq("Go Air");
                response.body.should.have.property('flightName').eq("GA-300");
                response.body.should.have.property('source').eq("bangalore");
                response.body.should.have.property('destination').eq("ahmendabad");
                response.body.should.have.property('fare').eq(5000);
            done();
            });
    });
  });
  /**
   * Test PUT route
   */

  describe("PUT /flight/edit/:id", () => {
    it("It should PUT an existing flight", (done) => {
        const id = "5fd882797a15ce2e942ac64f";
        const flight = {
            airLine: "Air India",
            flightName: "AI-300",
            source: "kerela",
            destination: "bangalore",
            fare: 5000
        };
        chai.request(server)                
            .put("/flight/edit/" +id)
            .send(flight)
            .end((err, response) => {
                console.log(response.data);
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('airLine').eq("Air India");
                response.body.should.have.property('flightName').eq("AI-300");
                response.body.should.have.property('source').eq("kerela");
                response.body.should.have.property('destination').eq("bangalore");
                response.body.should.have.property('fare').eq(5000);
            done();
            });
    });
  });
  /**
   * Test DELETE by flightName route
   */

  describe("DELETE /flight/delete/:flightName", () => {
    it("It should DELETE an existing flight", (done) => {
        const flightName = "GA-300";
        chai.request(server)                
            .delete("/flight/delete/" + flightName)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });
    });
  });
  
});
