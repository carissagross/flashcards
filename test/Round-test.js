const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

describe('Round', () => {
    let turn;
    let deck;
    let round;
    let card1;
    let card2;
    let card3;

    beforeEach(() => {
    turn = new Turn('object', card1)
    card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    card2 = new Card(2, 'What is a comma-separated list of related values?', ['array', 'object', 'function'], 'array');
    card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ['mutator method', 'accessor method', 'iteration method'], 'mutator method');

    deck = new Deck([card1, card2, card3])
    round = new Round(deck)
    });

    it('should be a function', () => {
        expect(Round).to.be.a('function');
    });

    it('should be an instance of Round', () => {
        expect(round).to.be.an.instanceof(Round);
    })

    it('should return the current card being played', () => {
        expect(round.returnCurrentCard()).to.deep.equal(card1)
    });
    
    it('should create a new instance of Turn when guess is made', () => {
        round.takeTurn('object')
        expect(round.currentGuess).to.be.an.instanceof(Turn);
    });
    
    it('should update the turn count', () => {
        round.takeTurn('object')
        expect(round.turns).to.equal(1);
    });

    it('should make the next card the current card', () => {
        round.takeTurn('array')
        expect(round.returnCurrentCard()).to.equal(card2)

        round.takeTurn('mutator method')
        expect(round.returnCurrentCard()).to.equal(card3)
    });

    it('should evaluate incorrect guesses', () => {
        round.takeTurn('function')
        expect(round.incorrectGuesses[0]).to.equal(1);

        round.takeTurn('function')
        expect(round.incorrectGuesses[1]).to.equal(2);
    });

    it('should store the card id of incorrect guesses', () => {
        round.takeTurn('object')
        round.takeTurn('function')
        round.takeTurn('mutator method')

        expect(round.incorrectGuesses[0]).to.equal(2)
    });

    it('should give feedback about a correct or incorrect guess', () => {
        expect(round.takeTurn('object')).to.equal('Correct!')
        expect(round.takeTurn('function')).to.equal('Incorrect!')
    });

    it('should calculate the percent of correct guesses', () => {
        round.takeTurn('object')
        round.takeTurn('function')
        round.takeTurn('mutator method')

        expect(round.incorrectGuesses[0]).to.equal(2)
        expect(round.calculatePercentCorrect()).to.equal(67)
    });

    it('should have a method that notifies that the round is over', () => {
        round.takeTurn('object')
        round.takeTurn('function')
        round.takeTurn('mutator method')

        // expect(round.endRound()).to.equal('** Round over! ** You answered 67% of the questions correctly!')
    });
});