const { describe, it } = require('mocha')
const { expect } =  require('chai')
const request =  require('request')

describe('server GET', function() {
  it('should return a JSON array of notes', function(done){
    request('http://localhost:3000/notes', {json: true}, function(error, response, body) {
      expect(error).to.equal(null)
      expect(body).to.be.an('array')
      expect(body).to.not.have.lengthOf(0)
      done()
    })
  })
})
