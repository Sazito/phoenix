<div align="center">
    <img width="200" src="code.example/assets/images/logo.png">
    <h1>Phoenix</h1>
</div>

<div align="center">

[![MIT licenses](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

</div>


#### React applications boilerplate 

A simple boilerplate that helps you make your react application with Server Side Rendering support.

### Getting start

Use `yarn setup` for making project ready to start.

#### Manual

Make a copy of `.env.default` to `.env` for production
and `.env.development` for development.

Then you need to rename `code.example` to `code` directory.

### Installing Packages

Use `yarn` for installing packages. also you can add your application modules in `code` directory. 

Yarn                           | Description
-------------------------------|----------------------------------------------------------------
`yarn start:dev`                 | For starting the project in `development` mode run these commands at project root.
`yarn start:prod`                | For starting and simulating the project in `production` with `webpack-dev-server` run these commands.
`yarn build && yarn start:serve` | For starting the project in `production` on the server run these commands.

## Built With

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Lerna](https://lerna.js.org/) - A tool for managing JavaScript projects with multiple packages.
* [Express](https://expressjs.com/) - Web framework for Node.js
* [React Redux](https://redux.js.org/) - A predictable state container for JavaScript apps
* [React Router](https://reacttraining.com/react-router/) - React Router is a collection of navigational components that compose declaratively with your application. 
* [Redux Saga](https://redux-saga.js.org/) - Is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.
* [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
* [Jest](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Amir Hossein Ahmadi** - *Developer* - [amirhossein693](https://github.com/amirhossein693)

* **Ahmad Reza Mohammadi** - *Developer* - [ARMy4D](https://github.com/ARMy4D)

* **Mohammad Reza Mahmoudi** - *Developer* - [rezaaa](https://github.com/rezaaa)

## License

Phoneix is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### Links

- [Change Log](CHANGELOG.md)
