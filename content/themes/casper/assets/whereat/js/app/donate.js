/**
 *
 * Copyright (c) 2015-present, Total Location Test Paragraph.
 * All rights reserved.
 *
 * This file is part of Where@. Where@ is free software:
 * you can redistribute it and/or modify it under the terms of
 * the GNU General Public License (GPL), either version 3
 * of the License, or (at your option) any later version.
 *
 * Where@ is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For more details,
 * see the full license at <http://www.gnu.org/licenses/gpl-3.0.en.html>
 *
 */

var Stripe = Stripe;
var requirejs = requirejs;
var stripeLiveKey = 'pk_live_nMssdI0nz5ik8XsBPlhB7yFV';
var stripeTestKey = 'pk_test_Yo40YCPulm6rG6vdHl111PUv';

requirejs.config({
  baseUrl: '../assets/whereat/js/lib',
  paths: {
    app: '../../js/app'
  },
  shim: {
    'jquery.simplePagination': ['jquery']
  }
});

requirejs(['jquery', 'lodash.min', 'app/api', 'app/donationList'], function($, _, api, donationList){
  $(document).ready(function(){
        
    Stripe.setPublishableKey(stripeLiveKey);

    var DONATIONS;
    var TOTAL;
    
    // (err, [{}]) -> none (render list and pagination);
    api.getDonations(function(err, res){
      if (err) console.log('error in GET /donations', err);
      else {
        TOTAL = res.body.total;
        donationList.setTotal(TOTAL);

        DONATIONS = res.body.donations.reverse();
        donationList.initialize(DONATIONS);
      }
    });
    
    // (Event) -> Boolean
    $('#donation-form').submit(function(e) {
      $(this).find('button').prop('disabled', true);
      Stripe.card.createToken($(this), handleStripeResponse);
      return false;
    });

    // (String, StripeResponse) -> Unit
    var handleStripeResponse = function(status, res) {
      var $f = $('#donation-form');
      res.error ?
        showErrors($f, res.error.message) :
        api.donate(parseApiRequest(res.id), handleDonationResponse($f));
    };

    // (DomNode, String) -> Unit
    var showErrors = function($form, msg){
      $form.find('.payment-errors').text(msg);
      $form.find('button').prop('disabled', false);
    };

    // (String) -> ApiRequest
    var parseApiRequest = function(token){
      var parseField = function(str){ return $('#donation-' + str).val(); };
      var isChecked = function(str){ return $('#donation-' + str).prop("checked"); };
      console.log(parseField('anonymous'));
      return {
        name: parseField('name'),
        amount: parseField('amount'),
        email: parseField('email'),
        anonymous: isChecked('anonymous'),
        date: new Date(),
        token: token
      };
    };

    // (Error, Response) -> Unit
    var handleDonationResponse = function($f){
      return function (err, res){
        err ?
          showErrors($f, res.body.error) :
          handleDonationSuccess(res);
      };
    };

    // (DonationResponse) -> Unit
    var handleDonationSuccess = function(res){
      hideForm();
      showThankYouMsg(res.body);
      donationList.setTotal(donationList.newTotal(res.body.amount, TOTAL));
      donationList.initialize([res.body].concat(DONATIONS));
    };
    
    // () -> Unit
    var hideForm = function(){
      $('#donation-form-container').hide();
    };

    // (DonationResponse) -> Unit
    var showThankYouMsg = function(res){
      $('#donation-success-container').append(thankYouMsg(res));
      $('#donation-success-container').show();
    };

    // (DonationResponse) -> String
    var thankYouMsg = function(res) {
      return "Thanks for donating " + res.amount + " " + firstName(res.name) + "!" + " \n Please tell a friend! <3";
    };

    // String -> String
    var firstName = function(fullName){
      return _.takeWhile(fullName.split(''), function(char){
        return char !== ' ';
      }).join('');
    };

  });
});
