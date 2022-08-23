const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');
const Game = require('../src/Game');


describe('Game', () => {

    it('should create an instance of Round', () => {
        let game = new Game();
        game.start()
        expect(game.currentRound).to.be.an.instanceOf(Round);
    })
   
});
