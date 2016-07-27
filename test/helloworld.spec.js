var expect = chai.expect;

describe("A Hello World", function() {
   beforeEach(function() { /* NOPE */ });
   afterEach(function() { /* NOPE */ });
   it('should Hello World', function() {
   	expect('Hello World').to.equal('Hello World'); 
   });
});
