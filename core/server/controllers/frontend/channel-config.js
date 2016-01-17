var _ = require('lodash'),
    config = require('../../config'),
    getConfig;

getConfig = function getConfig(name) {
  var defaults = {
    // custom  ---v [@aguestuser -- 1.16.16]
    blog: { 
      name: 'blog',
      route: '/blog'
    },
    index: { 
      name: 'index',
      route: '/',
      frontPageTemplate: 'home'
    },
    // ^--- end custom
        tag: {
            name: 'tag',
            route: '/' + config.routeKeywords.tag + '/:slug/',
            postOptions: {
                filter: 'tags:\'%s\''
            },
            data: {
                tag: {
                    type: 'read',
                    resource: 'tags',
                    options: {slug: '%s'}
                }
            },
            slugTemplate: true
        },
        author: {
            name: 'author',
            route: '/' + config.routeKeywords.author + '/:slug/',
            postOptions: {
                filter: 'author:\'%s\''
            },
            data: {
                author: {
                    type: 'read',
                    resource: 'users',
                    options: {slug: '%s'}
                }
            },
            slugTemplate: true
        }
    };

    return _.cloneDeep(defaults[name]);
};

module.exports = getConfig;
