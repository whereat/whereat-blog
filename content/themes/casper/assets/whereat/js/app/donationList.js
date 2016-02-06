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

define(['lodash.min', 'jquery', 'jquery.simplePagination'], function(_,$,simplePagination){

  // (String) -> String
  var parseDollars = function(str){
    var match = str.match(/^(\$?)(\d+\.?\d+)$/)[2];
    return parseFloat(match);
  };

  // (Number) -> String
  var prettyPrintDollars = function(float){
    return "$" + float.toFixed(2).toString();
  };

  function sliceList (data, currentPage, itemsPerPage) {
    // currentPage 1 indexed
    var start = (currentPage - 1 ) * itemsPerPage;
    var end =  start + itemsPerPage;
    return _.slice(data, start, end);
  }
  
  function renderList(ds) {
    $('#donations-list').html('<ul></ul>');
    _.each(ds, function(d){
      var html = '<li><strong>' + d.name + '</strong>: ' + d.amount + ' (' + d.date+ ')</li>';
      $('#donations-list' + ' ul').append(html);
    });
  };

  var itemsPerPage = 10;
  
  return {
    // (String) -> Unit
    setTotal:  function(str){
      $('#donations-total').html("<h2>Total Donations: " + str + "</h2>");
    },
    // (String) -> Unit
    newTotal: function(amount, total){
      var newTotal = parseDollars(amount) + parseDollars(total);
      console.log('new total: ', newTotal);
      return prettyPrintDollars(newTotal);
    },
    // (DonationResponse) -> Unit
    initialize : function(ds) {
      $("#donations-pagination").pagination({
        items: ds.length,
        itemsOnPage: itemsPerPage,
        cssStyle: 'light-theme',
        onPageClick: function(pageNum) {
          var subset = sliceList(ds, pageNum, itemsPerPage);
          renderList(subset);
        },
        onInit: function() {
          var subset = sliceList(ds, 1, itemsPerPage);
          renderList(subset);
        }
      });
    }
  };
  
});
