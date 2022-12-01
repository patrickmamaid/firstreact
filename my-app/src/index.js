import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// {this.props.value}  called on by the board class
class Square extends React.Component {
    // constructor(props) { // this gets ignored anyway commenting it out
    //     super(props);
    //     this.state = {
    //         value: null,
    //     }
    // }
    render() { // every class must have a render i think ????? this is a method inside a class in jsx
        return (
            <button
                className="square"
                onClick={()=> this.props.onClick() }
            >
                {this.props.value}
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


    handleClick(i){

        const squares = this.state.squares.slice(); // basically copy the array from this states squares to here per handleclick
        // interesting how you can modify an array here ..
        squares[i] = 'X'; // incoming array[i] then sets it to X
        this.setState({
            squares: squares
        }); // omg because no pointers lol, once you copy it here, add X to an index and send it back to setstate lol wow


        // so i have found that you should keep things immutable by doing copies apparently
        // this is especially good when you want to do historic jumps back in time
        // avoiding direct data mutation lets us keep pervious versions of the games history intact
        // and reusing them later VERY COOL
        // https://reactjs.org/tutorial/tutorial.html#setup-for-the-tutorial read DATA CHANGE WITH MUTATION
        

    }

    renderSquare(i) { // gets index 0
        return(
            <Square
                value={this.state.squares[i]}
                onClick={()=> this.handleClick(i) }
            /> // tell the square how it is by sending the square this value from our constructor/// by using the same index from the other render area
        );
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

