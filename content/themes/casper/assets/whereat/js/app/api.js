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

define(['lodash.min'],function(_) {
  return {
    donate: function(donation, cb) {
      cb(null, {
        status: 'success',
        name: donation.name,
        amount: donation.amount
      });
    },
    getDonations: function(cb) {
      var fakeDonations = _.range(100).map(function(x){
        return {
          name: 'person' + x,
          amount: 10 * x
        };
      });
      cb(null, fakeDonations);
  };
});
