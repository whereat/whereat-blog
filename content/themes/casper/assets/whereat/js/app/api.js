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

/* global define */

var url = 'https://donations.whereat.io';
// for testing:
// var url = 'https://donations-dev.whereat.io';
// var url = 'http://localhost:3001'; // for testing

define(['lodash.min', 'superagent.min'],function(_, request) {
  return {
    donate: function(donation, cb){
      return request
        .post(url + '/donations', donation)
        .end(function(err, res){ cb(err, res); });
    },
    getDonations: function(cb){
      return request
        .get(url + '/donations')
        .end(function(err, res){ cb(err, res); });
    }
 };
});


