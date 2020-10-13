
[![Maintainability](https://api.codeclimate.com/v1/badges/5a502ca580cc32e02669/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/artificial-artist-fe/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/5a502ca580cc32e02669/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/artificial-artist-fe/test_coverage)






#  The Artificial Artist

 You can find the deployed project at [theartificialartist.com](https://www.theartificialartist.com/).

##  Contributors



|                                       [Courtney Jackson](https://github.com/CourtneyJa)                                        |                                       [Tucker Wray](https://github.com/jtwray)                                        |                                       [Jimmy Hooker](https://github.com/hisnameisjimmy)                                        |                                       [Jake Gifford](https://github.com/panamajake86)                                        |                                       [Jimmique Parsons](https://github.com/jimmique-parsons)                                        |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://avatars2.githubusercontent.com/u/52590162?s=460&u=c1e321f74ee3bc5b1d1136ee3f32ba8db50c7ee3&v=4" width = "200" />](https://github.com/CourtneyJa)                       |                      [<img src="https://avatars3.githubusercontent.com/u/42871401?s=460&u=35f925b378034e977975950f46de33aaff941bf4&v=4" width = "200" />](https://tuckerwray.me)                       |                      [<img src="https://avatars3.githubusercontent.com/u/740373?s=460&v=4" width = "200" />](https://github.com/hisnameisjimmy)                       |                      [<img src="https://avatars0.githubusercontent.com/u/52115641?s=460&u=dde87e5c826904c67825c4b733701b8f44106d25&v=4" width = "200" />](https://github.com/panamajake86)                       |                      [<img src="https://ca.slack-edge.com/ESZCHB482-W012X6PE61X-482e0a7d5334-512" width = "200" />](https://github.com/jimmique-parsons)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/CourtneyJa)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jtwray)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/hisnameisjimmy)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/panamajake86)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jimmique-parsons)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/courtney-jackson-609/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jtwray/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jamesharrisonhookerjr/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jake-gifford-4516251a/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jimmiqueparsons/) |

<br>
<br>


## Project Overview

1️⃣ [Trello Board](https://trello.com/b/48TmCzIE/labs-pt9-artificial-artist)

2️⃣ [Product Canvas](https://www.notion.so/Artificial-Artist-1934140bf39c4f2ba1b8910de0ee0d41)

The Artificial Artist is a brand new music visualization experience. Combining music with generative adversarial network (GAN) images, users can create unique music visualization videos. 

## Key Features

-   Create your own music visualization videos
-   Browse other user's videos
-   Advance settings give users the ability to customize their videos


## Tech Stack

### Front end built using:

#### 1️⃣ [Reactjs](https://reactjs.org/) ![React](https://img.shields.io/badge/react-v16.13.1-blue.svg)

-    Declarative --Declarative views make your code more predictable and easier to debug.
-    Component-Based --Build encapsulated components that manage their own state, then compose them to make complex UIs.
-    Learn Once, Write Anywhere --You can develop new features in React without rewriting existing code

#### 2️⃣ [Redux](https://redux.js.org/) ![Redux](https://img.shields.io/badge/redux-v4.0.5-blueviolet.svg)
 
-   Single immutable state tree
-   Ease of Testing
-   Global Store of App State

#### Front end deployed to `AWS Amplify`

#### [Back end](https://github.com/Lambda-School-Labs/artificial-artist-be) built using:

#### 1️⃣ [Node Express](https://expressjs.com/) ![Express](https://img.shields.io/badge/express-v4.17.1-lightgrey.svg)

-    Great performance! Node was designed to optimize throughput and scalability in web applications and is a good solution for many common web-development problems (e.g. real-time web applications).
-    Code is written in "plain old JavaScript", which means that less time is spent dealing with "context shift" between languages when you're writing both client-side and server-side code.
-    The node package manager (NPM) provides access to hundreds of thousands of reusable packages. It also has best-in-class dependency resolution and can also be used to automate most of the build toolchain.

#### 2️⃣ [PostgreSQL](https://www.postgresql.org/) ![PostgreSQL](https://img.shields.io/badge/pg-v8.2.1-blue.svg)

-    Implements the SQL standard very well.
-    Completely open source.
-    It supports lots of advanced data types, such as (multi-dimensional) arrays, user-defined types, etc.


# APIs

## 1️⃣ https://developers.deezer.com/api/search

The API gives users access to the site's data making it available for use in third party web sites and applications. This data includes albums, artists, comments, editorials, folders, playlists, radio, searches, tracks and users. The API uses HTTP calls and responses are formatted in XML, JSON and PHP.


# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

    *  REACT_APP_SERVER_URL - for your local development server
   

# Testing

## 1️⃣ [Jest](https://jestjs.io/) ![Jest](https://img.shields.io/badge/jest-v4.2.4-red.svg)
-   Jest is a JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!


# Installation Instructions

* Clone this repo
* run `yarn install` to install all required dependencies
* run `yarn start` to start the local server


## Other Scripts

* start - ***"react-scripts start",*** starts the production server after a build is created
* build - ***"react-scripts build",*** creates a build of the application
* test - ***"react-scripts test",*** runs tests in **tests** directory
* eject - ***"react-scripts eject",*** copy the configuration files and dependencies into the project so you have full control over them
* coverage - ***"CI=true yarn test --coverage --watchAll=false || true"*** refers to how much of your app code is covered by unit tests

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/Lambda-School-Labs/artificial-artist-be/blob/master/README.md) for details on the backend of our project.
