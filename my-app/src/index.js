import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// {this.props.value}  called on by the board class
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        }
    }
    render() {
        return (
            <button className="square"
                    onClick={() =>
                    {
                        console.log('click');
                        this.setState({value: 'X'})
                    }}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null) // fill up 9 boxes but empty
        }
    }

    renderSquare(i) { // gets index 0
        return(
            <Square value={this.state.squares[i]} /> // tell the square how it is by sending the square this value from our constructor/// by using the same index from the other render area
        )
    }


    // this is the main board basically
    // each section is calling its local renderSquare within this class passing an index value here
    // renderSquare returns
    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
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

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

