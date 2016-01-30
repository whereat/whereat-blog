import chai from 'chai';
const should = chai.should();
import asPromised from 'chai-as-promised';
chai.use(asPromised);

import wd, { asserters } from 'wd';
const { isDisplayed, isNotDisplayed } = asserters;
asPromised.transferPromiseness = wd.transferPromiseness;

import _ from 'lodash';

// to run the tests, selenium-standalone must be installed and started:
// selenium-standalone start

describe('donations page', function() {

  this.timeout(10000);

  let browser;
  before(() => {
    browser = wd.promiseChainRemote();
    return browser.init({browserName: 'chrome'}); });
  beforeEach(() => browser.get("http://localhost:2368/donate"));
  after(() => browser.quit());

  const noAssert = asserters.jsCondition(true === true);

  describe('donations form', () => {

    it('has correct layout', done => {

      browser

        .elementByCssSelector('#donation-name-label').text()
          .should.become('Name')
        .elementByCssSelector('#donation-name').getTagName()
          .should.become('input')
        .elementByCssSelector('#donation-name').getAttribute('type')
          .should.become('text')
        .elementByCssSelector('#donation-name').getValue()
          .should.become('')

        .elementByCssSelector('#donation-email-label').text()
          .should.become('Email')
        .elementByCssSelector('#donation-email').getTagName()
          .should.become('input')
        .elementByCssSelector('#donation-email').getAttribute('type')
          .should.become('text')
        .elementByCssSelector('#donation-email').getValue()
          .should.become('')

        .elementByCssSelector('#donation-amount-label').text()
          .should.become('Amount')
        .elementByCssSelector('#donation-amount').getTagName()
          .should.become('input')
        .elementByCssSelector('#donation-amount').getAttribute('type')
          .should.become('text')
        .elementByCssSelector('#donation-amount').getValue()
          .should.become('')

        .elementByCssSelector('#donation-card-number-label').text()
          .should.become('Card Number')
        .elementByCssSelector('#donation-card-number').getTagName()
          .should.become('input')
        .elementByCssSelector('#donation-card-number').getAttribute('type')
          .should.become('text')
        .elementByCssSelector('#donation-card-number').getValue()
          .should.become('')

        .elementByCssSelector('#donation-cvc-label').text()
          .should.become('CVC')
        .elementByCssSelector('#donation-cvc').getTagName()
          .should.become('input')
        .elementByCssSelector('#donation-cvc').getAttribute('type')
          .should.become('text')
        .elementByCssSelector('#donation-cvc').getValue()
          .should.become('')

        .elementByCssSelector('#donation-exp-month-label').text()
          .should.become('Expiration (MM/YYYY)')
        .elementByCssSelector('#donation-exp-month').getTagName()
          .should.become('input')
        .elementByCssSelector('#donation-exp-month').getAttribute('type')
          .should.become('text')
        .elementByCssSelector('#donation-exp-month').getValue()
          .should.become('')
        .elementByCssSelector('#donation-exp-year').getTagName()
          .should.become('input')
        .elementByCssSelector('#donation-exp-year').getAttribute('type')
          .should.become('text')
        .elementByCssSelector('#donation-exp-year').getValue()
          .should.become('')

        .notify(done);
    });

    it('handles successful form submissions', done => {


      browser

        .elementByCssSelector('#donation-name').type('Mary Rose Cook')
        .elementByCssSelector('#donation-email').type('mary@example.com')
        .elementByCssSelector('#donation-amount').type('100000')
        .elementByCssSelector('#donation-card-number').type('4242424242424242')
        .elementByCssSelector('#donation-cvc').type('404')
        .elementByCssSelector('#donation-exp-month').type('06')
        .elementByCssSelector('#donation-exp-year').type('2020')
        .elementByCssSelector('#donate-button').click()

        .waitForElementByCssSelector('#donation-form-container', isNotDisplayed)
        .waitForElementByCssSelector('#donation-success-container', isDisplayed)

        .elementByCssSelector('#donation-success-container').text()
          .should.become('Thanks for donating $100000 Mary! Please tell a friend! <3')

        .elementByCssSelector('#donations-list > ul > li:nth-child(1)').text()
          .should.become('Mary - $100000')
    
    .notify(done);

    });

    // ZIGGY: I didn't have time to figure out how to test requirejs modules, so
    // I just copy and pasted (gasp!) this function here.
    describe('donation logic', () =>{
      
      function sliceList (data, currentPage, itemsPerPage) {
        // currentPage 1 indexed
        var start = (currentPage - 1 ) * itemsPerPage;
        var end =  start + itemsPerPage;
        return _.slice(data, start, end);
      }
      
      it('sliceList returns correct number', () => {
        var testData1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        var testData2 = _.range(100);
        sliceList(testData1, 4, 3).should.eql([9,10,11]);
        sliceList(testData1, 1, 10).should.eql([0,1,2,3,4,5,6,7,8,9]);
        sliceList(testData2, 3, 10).should.eql(_.range(20, 30));
      });

    });
    
  });
});
