# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Ad Portal application with rules based discounts

## Prerequisites ## 

* [create-react-app](https://github.com/facebookincubator/create-react-app)
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Further information on the same is available via the before mentioned link.

## Installing

```bash
git clone 'this-repo-url' app-name
cd app-name
npm install
```

## Running ##

In a different terminal tab...

```bash
npm start
```
The "Homepage" of the ad portal will be shown.

### Configiruing Rules
The rules are configured under :
```bash
src/config/config.js
```
This file has configurable properties, using which rules can be easily altered and also the current company can be set ('currentCompany'). Currently, its set to 'uniliver'. The discounted prices are applicable for the following companies:

```bash
unilever
apple
nike
ford
```

If none of the above are mentioned, the prices are defaulted to actual price per ad.
