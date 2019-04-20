#Phoenix [![MIT licenses](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
##### React applications boilerplate 

A simple boilerplate that helps you make your react application with Server Side Rendering support.

### getting start

Make a copy of `.env.example` to `.env` for production
and `.env.development` for development.

Then you need to rename `src.example` to `src` directory.

install packages

    yarn

Also you can add your application modules in `src` directory.

For starting the project in `development` mode run these commands at project root.

    yarn start:dev

For starting and simulating the project in `production` with `webpack-dev-server` run these commands.

    yarn start:prod

For starting the project in `production` on the server run these commands.

    yarn build && yarn start:serve
