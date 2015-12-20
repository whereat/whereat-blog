/* global define */

define({
  donate: function(donation, cb) {
    cb(null, {
      status: 'success',
      name: donation.name,
      amount: donation.amount
    });
  }
});
