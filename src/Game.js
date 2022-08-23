const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Round = require('../src/Round');
const Turn = require('../src/Turn');
const Deck = require('../src/Deck');
const Card = require('../src/Card');
const { prototype } = require('mocha');



class Game {
  constructor() {
    this.currentRound;
  }

  start() {
    const cards = [];

    prototypeQuestions.forEach(element => {
      let cardData = new Card(element.id, element.question, element.answers, element.correctAnswer)
      cards.push(cardData)
    });

    const deck = new Deck(cards)
    const round = new Round(deck)
    this.currentRound = round
   
    this.printMessage(deck, round)
    this.printQuestion(round)
  }

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }

 
}

module.exports = Game;