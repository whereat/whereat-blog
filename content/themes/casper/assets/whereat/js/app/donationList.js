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

  function sliceList (data, currentPage, itemsPerPage) {
    // currentPage 1 indexed
    var start = (currentPage - 1 ) * itemsPerPage;
    var end =  start + itemsPerPage;
    return _.slice(data, start, end);
  }
  
  function renderList(data) {
    $('#donations-list').html('<ul></ul>');
    _.each(data, function(donation){
      var html = '<li>' + donation.name + ' - $' + donation.amount + '</li>';
      $('#donations-list' + ' ul').append(html);
    });
  };

  var itemsPerPage = 10;
  
  return {
    initialize : function(data) {
      $("#donations-pagination").pagination({
        items: data.length,
        itemsOnPage: itemsPerPage,
        cssStyle: 'light-theme',
        onPageClick: function(pageNum) {
          var subset = sliceList(data, pageNum, itemsPerPage);
          renderList(subset);
        },
        onInit: function() {
          var subset = sliceList(data, 1, itemsPerPage);
          renderList(subset);
        }
      });
    }
  };
  
});
