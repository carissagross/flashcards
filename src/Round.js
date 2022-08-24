const Turn = require('../src/Turn');

class Round {
    constructor(deck) {
        this.deck = deck;
        this.turns = 0;
        this.incorrectGuesses = [];
        this.currentGuess;
    }

    returnCurrentCard() {
        return this.deck.cards[this.turns]
    }

    takeTurn(guess) {
        this.currentGuess = new Turn(guess, this.returnCurrentCard())
        
        this.turns++

        if(!this.currentGuess.evaluateGuess()) {
             this.incorrectGuesses.push(this.currentGuess.currentCard.id)            
        }
        return this.currentGuess.giveFeedback()
    }

    calculatePercentCorrect() {
        const correctAnswers = this.turns - this.incorrectGuesses.length
        return (Math.round(correctAnswers / this.turns * 100))
    }

    endRound() {
        console.timeLog('Game Run Time') 
      return console.log (`** Round Over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`)
    }
}


    

module.exports = Round;