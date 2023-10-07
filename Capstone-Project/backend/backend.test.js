let expect = require('chai').expect
let request = require('request')
describe('Backend status code', function(){
    it("should return 200",function(done){
        request('http://localhost:3001/api/events',function(error, response, body){
            expect(response.statusCode).to.equal(200)
            done()
        })
})
})