# portfolio-tracking

A portfolio tracking API which allows adding/deleting/updating trades and can do basic return calculations etc

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node](https://nodejs.org/en/) installed on your local machine, then after cloning the project run the following command in the project directory to install the dependencies in the node_modules folder.

```
npm install
```
But this app involves database url which is hidden. you can access the app on heroku using

```
https://portfolio-tracking.herokuapp.com/portfolio
```

### After Installing

(The app will run only if you have the app-env file (having the database url) in your project folder otherwise you can access the app on heroku)

A step by step series of examples that tell you have to get a development env running

Run the following command to start the server.

```
npm start
```
Your application  should now be running on [localhost:3000](http://localhost:3000/).

## Testing it on Postman

You need to have [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) installed for testing the APIs.

### Postman Documentation

Here are the following routes :

https://portfolio-tracking.herokuapp.com/portfolio/createPortfolio - will create a portfolio

https://portfolio-tracking.herokuapp.com/portfolio/ - will return the entire portfolio

https://portfolio-tracking.herokuapp.com/portfolio/holdings - will return the holdings of different stocks

https://portfolio-tracking.herokuapp.com/portfolio/returns - will return the cumulative returns

https://portfolio-tracking.herokuapp.com/portfolio/addTrade - will add trades in the database

https://portfolio-tracking.herokuapp.com/portfolio/updateTrade/:tradeId - will update a particular trade

https://portfolio-tracking.herokuapp.com/portfolio/removeTrade - will remove the trade from the database

https://portfolio-tracking.herokuapp.com/portfolio/addStock - will add a stock in the databases

You can see screenshots in the README.pdf to see request body structure for the above APIs

## Deployment

The following project is deployed on Heroku, you can access it through [this](https://portfolio-tracking.herokuapp.com/portfolio) link:

```
https://portfolio-tracking.herokuapp.com/portfolio
```
You can access the APIs by appending portfolio/{api_name}/

## Built With

* [Node](https://nodejs.org/en/) - Server-side programming language
* [Express](https://expressjs.com/) - Node.js web application framework
* [MongoDB](https://www.mongodb.com/) - A NoSQL Database

## Author

* **Umang Govil** - *(umang.govil17996@gmail.com)*
