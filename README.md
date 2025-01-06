# Meteor TypeScript Template

For anyone who wants to start a working typescript project with Meteor.js 3 and up. This template contains basic routing, authentication and utilities as well as many typings often required my new meteor projects. The template should work with earlier versions of Meteor, but is currently tested on version 3.

## Content

- [Running](#running)
- [Project Structure](#project-structure)
- [Helpful Resources](#helpful-resources)

## Running

1. Install Dependencies: `meteor npm i`
1. Run project: `npm start`

## Project Structure

- **server/** - Startup actions and server-only utilities
- **imports/**
    - **api/** - Meteor methods, collection definitions, typescript collection models
    - **ui/** - All pages/views and components for the app
    - **startup/** - Contains all imports to be taken to the server on startup (collections, methods, publications)
    - **utils/** - Utility functions for the client

## Helpful Resources

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [MongoDB](https://www.mongodb.com)
- [Meteor.js](https://www.meteor.com)
