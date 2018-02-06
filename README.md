# Blackjack

The aim of this exercise is to create a simple React-powered game of [Blackjack](http://en.wikipedia.org/wiki/Blackjack). This should be a single-player game played against an AI dealer.

> Your game must follow the following simple set of rules:
>
> 1. There is a standard set of 52 cards. When the game starts, the player is given 2 random cards and the dealer is given one which the player can see. Each numbered card has its face value, the ace can be either 1 or 11 and picture cards are worth 10 points.
> 2. The player is given the following 2 options: ‘hit’ or ‘stick’.
> 3. The player can hit or stick until they are either happy with the sum of the values of their cards or until the total of their cards add up to 21 or over. If their hand is over 21, they lose. Otherwise, if they stick, the dealer will then start drawing cards until they either have a closer total to 21. If the dealer goes over then the player wins.

There will be a follow up task building on top of what you produce here in the next interview.

## Get going

1. Install with `npm install` :coffee:
2. Start the dev server with `npm start`
3. Build your application out of [./src/components/app/app.js](./src/components/app/app.js)
4. Tests (`npm test`) found in `**/__tests__/*.test.js` will be run with [jest](https://facebook.github.io/jest/)

#### Tips

- This app was bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app). Find the docs [here](./CRA.md)!
  - Feel free to eject if you want!
- We've provided a few [atom components](./src/components) for you to get going quickly with.
- We are not expecting an overly-polished UI. The purpose of this exercise is to see how you model the various concepts of the game inside the application and how you design your code.
- We've installed the following packages for your convenience (feel free to use at will, ignore or install more)
  - [enzyme](http://airbnb.io/enzyme/)
  - [immutable](http://facebook.github.io/immutable-js/)
  - [lodash](https://lodash.com/)
  - [recompose](https://github.com/acdlite/recompose/)

## Once you're done

Run `npm run build` and then pack up your entire project in a zip folder and ping it back over to us! :)

## Thanks

Peter Tripp for providing the [deck of cards](https://github.com/notpeter/Vector-Playing-Cards)
