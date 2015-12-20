import chai from 'chai';
const should = chai.should();
const jquery = fs.readFileSync(
  './content/themes/casper/assets/whereat-js/lib/jquery-2.1.4.min.js',
  'utf-8'
);
//import chaiJquery from 'chai-jquery';
//chai.use(chaiJquery);

import hb from 'handlebars';
import dom from 'jsdom';
import fs from 'fs';


xdescribe('donate page', () => {

  const src =
          fs.readFileSync('./content/themes/casper/page-about.hbs', 'utf-8');
  const page = hb.compile(src)({
    post_class: 'post page',
    title: 'Donation'
  });
  const setup = test => dom.env({
    html: page,
    src: [jquery],
    done: (err, window) => {
      if (err) console.error(err);
      else {
        const {$, document} = window;
        test($, document);
      }
    }
  });

  describe('phantom', () => {

    it('works', done => {
      setup(($, document) => {
        const btn = $('#payment-button');
        console.log('btn.text()', btn.text());
        console.log('btn.val()', btn.val());
        console.log('btn.html()', btn.html());
        console.log('document', $(document).html());

        done();
      });
    });
  });
});
