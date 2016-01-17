About Where@
===============

Where@ is a secure location-sharing app that helps users locate a crowd of people or find their friends in a crowd. It is built to reflect our deeply held belief that everyday people shouldn't have to choose between enjoying privacy and using the *best* location sharing tool possible.

To learn more about the project, visit <https://whereat.io>.

To see the rest of our source code, visit <https://github.com/whereat>.

About Ghost
============

This blog is built on custom modifications to the excellent [Ghost.js](https://github.com/tryghost/Ghost) blogging platform, which is provided under a BSD(ish) license.

Notes for Devs
==============

## Node Version
* Node v 4.2.0 (LTS) is the latest version of Node supported by Ghost. (See [here](http://support.ghost.org/supported-node-versions/).)

## Running Selenium Tests

Tests require a running instance of `selenium-standalone` server. Install it with:

```shell
$ npm install -g selenium-standalone
$ selenium-standalone install
```

Tests further require a running application server. If you don't have one running, start one with:

```shell
$ npm run start
```

Then spin up the selenium server with:

```shell
$ selenium-standalone start
```

If that feels like a lot to remember, just use:

```shell
$ npm run whereat-pretest
<RET>
```

This script will throw some errors if you already have application server or selenium server instances running, but then it will continue on its merry way!

And finally, run the tests!

```shell
$ npm run test-whereat
```
