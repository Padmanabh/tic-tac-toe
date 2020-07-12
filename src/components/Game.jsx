import React from 'react';
import Board from './Board';
import { calculateWinner, boardFinished } from '../helper';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), winningCombination: null }],
      currentStep: 0,
      xIsNext: true,
      winner: null,
      isBoardFinished: false,
      boardStatus: 'Game - on',
      features: [
        "Navigate the previous moves once the game is finished.",
        "Game does not let users to change the board while navigating previous moves.",
        "Highlights the winning combination after game is finished as well as switching between moves.",
        "Lets you start a new game during the play"
      ]
    }
  }


  jumpTo(move) {
    // this.setState({
    //   squares: Array(9).fill(null),
    //   xIsNext: true,
    //   winner: null,
    //   isBoardFinished: false,
    //   boardStatus: 'Game - on'
    // });
    if (move === 0) {
      this.setState({
        history: [{
          squares: Array(9).fill(null),
          winningCombination: null
        }],
        currentStep: 0,
        xIsNext: true,
        winner: null,
        isBoardFinished: false,
        boardStatus: 'Game - on'
      });
    }
    else {
      this.setState({
        currentStep: move, //,
        //xIsNext: move % 2 === 0,
      });
    }
  }

  handleClick(i) {

    //dont process click events when the game is finished
    if (this.state.boardFinished || this.state.winner)
      return;

    const history = this.state.history;
    const current = history[this.state.currentStep];

    const squares = current.squares.slice();
    let isXNext = this.state.xIsNext;

    if (!squares[i]) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      isXNext = !this.state.xIsNext;
    }

    const winningCombination = calculateWinner(squares);
    const isBoardFinished = boardFinished(squares);
    let winner = null;
    if (winningCombination)
      winner = winningCombination[0];

    this.setState({
      history: history.concat([{ squares: squares, winningCombination: winningCombination }]),
      xIsNext: isXNext,
      winner: winner,
      isBoardFinished: isBoardFinished,
      currentStep: history.length

    });
  }

  render() {
    const current = this.state.history[this.state.currentStep];

    const nextPlayer = (<div className="status">Next Player {this.state.xIsNext ? 'X' : 'O'}</div>) //'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    let boardStatus = 'Game - on';
    let moves = null;
    let newGame = null;

    const features = this.state.features.map((feature, index) => {
      return (
        <li key={index}>{feature}
        </li>
      )
    });

    if (this.state.isBoardFinished || this.state.winner) {
      boardStatus = (this.state.winner) ? 'Winner: ' + this.state.winner : 'Game is a draw';

      moves = this.state.history.map((step, move) => {
        if (move) {
          const descrption = `Go to move # ${move}`;
          return (
            <li key={move}>
              <a className={`moveLink ${(this.state.currentStep === move) ? 'active' : ''}`} onClick={() => this.jumpTo(move)}>{descrption}</a>
            </li>
          )
        }
      });
    }

    if(this.state.currentStep)
    newGame = (<div className="status"><button onClick={() => this.jumpTo(0)}>Start New Game</button></div>);

    return (
      <div className="container">
        <div>
          <h1>Tic Toc Toe Game</h1>
          <div className="game">
            <div className="game-board">
              <Board squares={current.squares} onClick={(i) => this.handleClick(i)} winningCombination={current.winningCombination} />
            </div>
            <div className="game-info">
              <div className="status">{boardStatus}</div>
              {nextPlayer}
              {newGame}
              <ol>{moves}</ol>
            </div>

          </div>
        </div>
        <div>
          <h3>Whats new!</h3>
          <ol>{features}</ol>
        </div>
      </div>
    );
  }
}

export default Game;