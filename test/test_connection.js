/**
 * Created by techmaster on 1/6/17.
 */
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const db = require('../db');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const authenticate = db.authenticate()
  .then(err => {
    return 'success';
  })
  .catch(err => {
    return 'failed';
  });


//https://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/
describe('Test sequelize connection', function() {
  it('should connect to PostgreSql successfully', function () {

    //Sử dụng expect : tôi kỳ vọng đối tượng X sẽ như thế nào
    //return expect(authenticate).to.eventually.equal('success');

    //Sử dụng should : đối tượng X nên như thế nào
    return authenticate.should.eventually.equal('success');
  });
});

