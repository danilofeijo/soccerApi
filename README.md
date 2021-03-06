# What is soccerApi?
It's a project created to develop basic REST API endpoints with [Express][1] and [MongoDB][5], and also apply automated tests with [Mocha][2] and [Chai][3].

Express, Mocha and Chai are all packages from [NodeJs][4] plataform, while MongoDB is a database program that used to store our data.

# What is already developed?

## API development side

The /team endpoint provides the folowing methods:
- GET (all and by ID)
- POST
- PUT
- DELETE

## API Tests side
We have basic scenarios for given methods:
- GET (all and by ID)
- POST
- PUT
- DELETE

We also have alternative scenarios for given methods:
- POST
- DELETE

# Environment Set Up
Setting up the environmet is quick and simple. Simply follow the instructions below

## Pre-requeriment
Be sure that [NodeJs][4] and [MongoDB][5] are properly installed.

### Install NodeJs
Try a tutorial about [how to install latest NodeJs on Ubuntu][7].

PS.: You can check the Node version by running `node -v` on termianal. If everything is Ok, the Node version should be displayed (e.g. `v8.11.4`).

### Install MongoDB
Try a tutorial about [How to Install MongoDB][6].

PS.: You can check MongoDB status by running `sudo systemctl status mongodb` on termianal. If everything is Ok, MongoDB should has the "Active" status.

## Install environment
Open the terminal and...
- Clone the repository - `git clone https://github.com/danilofeijo/soccerApi.git`
- Install packages and their dependencies - `npm install`

## Start the server
Open the terminal and...
- Start the server - `npm start`

So the server must be up and running on: **http://localhost:8081**

## Run all the automated tests
Open the terminal and...
- Run the tests - `npm test`

## Postman collection
You may want to use [Postman][10] to call the SoccerAPI endpoints. If so, you can [import collection on Postman][11] using the `postmanCollection.json` file (stored on root folder). 

# Reference
This content is based on a [Scotch post][8] writen by [Samuele Zaza][9].

<!-- Links list -->
[1]: https://expressjs.com
[2]: https://mochajs.org
[3]: https://www.chaijs.com
[4]: https://nodejs.org
[5]: https://www.mongodb.com/download-center/community
[6]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04
[7]: https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/
[8]: https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
[9]: https://scotch.io/@samuxyz
[10]: https://www.getpostman.com/
[11]: https://learning.getpostman.com/docs/postman/collection_runs/working_with_data_files/#importing-sample-collection-files
