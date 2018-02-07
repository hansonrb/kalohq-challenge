import React from 'react';
import { withState, withHandlers, compose } from 'recompose';
import { each, range, shuffle, reduce, random } from 'lodash';

import Button from '../button';
import Card from '../card';
import Text from '../text';

import './app.css';

const generateFullDeck = () => {
  let deck = [];
  each(
    [
      'ace',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'jack',
      'queen',
      'king',
    ],
    v => {
      each(['diamond', 'spade', 'heart', 'club'], s =>
        deck.push({
          suit: s,
          value: v,
        }),
      );
    },
  );

  range(0, random(0, 10)).forEach(i => (deck = shuffle(deck)));
  return deck;
};

let fullDeck = generateFullDeck();

const getRandomCard = () => {
  const card = fullDeck.pop();
  return card;
};

const sumCards = cards => {
  let foundAce = false;
  let sum = reduce(
    cards,
    (sum, c) => {
      if (c.value === 'ace') {
        foundAce = true;
        return sum + 1;
      } else if (c.value.length > 3) {
        return sum + 10;
      } else {
        return sum + parseInt(c.value, 10);
      }
    },
    0,
  );

  if (foundAce && sum <= 11) return sum + 10;
  return sum;
};

const hasNoMoreMove = cards => {
  const sum = sumCards(cards);
  if (sum >= 21) return true;

  return false;
};

const isBlackJack = cards => {
  const sum = sumCards(cards);
  if (cards.length === 2 && sum === 21) return true;
  return false;
};

const enhance = compose(
  withState('gameStatus', 'setGameStatus', 'initial'),
  withState('playerCards', 'setPlayerCards', []),
  withState('dealerCards', 'setDealerCards', []),

  withHandlers({
    autoStand: props => cards => {
      const compareScore = (p, d) => {
        const ps = sumCards(p);
        const ds = sumCards(d);

        if (ps > 21) {
          return -1;
        } else if (ds > 21) {
          return 1;
        } else if (ps === 21 && ds !== 21) {
          return 1;
        } else if (ds === 21 && ps !== 21) {
          return -1;
        } else if (ps === ds) {
          if (p.length === d.length) return 0;
          else return p.length < d.length ? 1 : -1;
        }

        return ps > ds ? 1 : -1;
      };

      let pcards = cards;
      let dcards = props.dealerCards;

      while (!hasNoMoreMove(dcards)) {
        if (dcards.length > 0 && compareScore(pcards, dcards) === -1) break; // if dealer already won
        dcards.push(getRandomCard());
      }

      props.setDealerCards(dcards);

      const result = compareScore(pcards, dcards);
      if (result === 0) props.setGameStatus('draw');
      else props.setGameStatus(result > 0 ? 'won' : 'lose');
    },
  }),
  withHandlers({
    newGame: props => () => {
      fullDeck = generateFullDeck();

      const pcs = [getRandomCard(), getRandomCard()];

      props.setPlayerCards(pcs);
      props.setDealerCards([getRandomCard()]);

      props.setGameStatus('on');

      setTimeout(() => {
        if (isBlackJack(pcs)) props.autoStand(pcs);
      }, 200); // wait for dealer card to be set
    },
    handleHit: props => () => {
      let pcards = props.playerCards.slice();
      pcards.push(getRandomCard());
      props.setPlayerCards(pcards);

      if (hasNoMoreMove(pcards)) {
        props.autoStand(pcards);
      }
    },
    handleStand: props => () => {
      props.autoStand(props.playerCards);
    },
  }),
);

export default enhance(
  ({
    gameStatus,
    playerCards,
    dealerCards,
    newGame,
    handleHit,
    handleStand,
  }) => {
    return (
      <div className="app">
        <div className="table">
          <div className="dealer">
            {range(0, 6).map(idx => (
              <div className="slot" key={idx}>
                {dealerCards[idx] && (
                  <Card
                    suit={dealerCards[idx].suit}
                    value={dealerCards[idx].value}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="message-board">
            {gameStatus === 'initial' && <Text size="huge">Deal to start</Text>}
            {(gameStatus === 'won' || gameStatus === 'lose') && (
              <Text size="huge">
                You {gameStatus} by {sumCards(dealerCards)} /{' '}
                {sumCards(playerCards)}, Deal to start new
              </Text>
            )}
            {gameStatus === 'on' && <Text size="huge">Hit or Stand</Text>}
          </div>
          <div className="action-buttons">
            {gameStatus === 'on' && <Button onClick={handleHit}>Hit</Button>}

            {gameStatus === 'on' && (
              <Button color="tertiary" onClick={handleStand}>
                Stand
              </Button>
            )}

            {gameStatus !== 'on' && <Button onClick={newGame}>Deal</Button>}
          </div>
          <div className="player">
            {range(0, 6).map(idx => (
              <div className="slot" key={idx}>
                {playerCards[idx] && (
                  <Card
                    suit={playerCards[idx].suit}
                    value={playerCards[idx].value}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
