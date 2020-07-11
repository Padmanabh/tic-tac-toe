import React from 'react';
import Square from './Square';
import { calculateWinner, boardFinished } from '../helper';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
            isBoardFinished: false,
            boardStatus: 'Game - on'
        }
    }

    handleStartNew() {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
            isBoardFinished: false,
            boardStatus: 'Game - on'
        });
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        let isXNext = this.state.xIsNext;

        if (!squares[i] && !this.state.isBoardFinished && !this.state.winner) {
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            isXNext = !this.state.xIsNext;
        }

        const winner = calculateWinner(squares);
        const isBoardFinished = boardFinished(squares);

        this.setState({
            squares: squares,
            xIsNext: isXNext,
            winner: winner,
            isBoardFinished: isBoardFinished
        });

    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)} />
        );
    }

    render() {
        let nextPlayer = (<div className="status">Next Player {this.state.xIsNext ? 'X' : 'O'}</div>) //'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        let boardStatus = 'Game - on';
        if (this.state.isBoardFinished || this.state.winner) {
            boardStatus = (this.state.winner) ? 'Winner: ' + this.state.winner : 'Game is a draw';
            nextPlayer = (<div className="status"><button onClick={() => this.handleStartNew()}>Start New Game</button></div>);
        }
        return (
            <div>
                <div className="status">{boardStatus}</div>
                {nextPlayer}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;