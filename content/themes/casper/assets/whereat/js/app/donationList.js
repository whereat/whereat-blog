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

  return {
    initialize : function(selector) {
      $(selector).pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
      });
    }
  };
  
});

/*
var data = [];

$(.pageination).pagination({
  items: data.length,
  itemsOnPage: 10,
  cssStyle: 'light-theme',
  selectOnClick: mySelectOnClick
})

function mySelectOnClick(pageNum) {
  var sliceMath = getItemsGivenPage(pageNum);
  var subset = splitItems(sliceMath);
  renerList(subset);
}
function splitItems(sliceMath) {
  data.slice(sliceMath)
}

function renderList(items) {
  _.each(item, function(item){
    // visuals
    $(selector).append('<li>' + item.ammount + '</li>')
  })
}

function getItemsGivenPage(page) {
  // math to figure out slice
  
}

*/
