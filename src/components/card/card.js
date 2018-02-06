import React, {PropTypes} from 'react';
import cx from 'classnames';

import './card.css';

function Card({
  suit,
  value,
}) {
  return (
    <div
      className={cx({
        'card': true,
        [`card-suit-${suit}`]: true,
        [`card-value-${value}`]: true,
      })}
    />
  );
}

Card.propTypes = {
  suit: PropTypes.oneOf([
    'diamond',
    'spade',
    'heart',
    'club'
  ]).isRequired,
  value: PropTypes.oneOf([
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
  ]).isRequired,
};

export default Card;
