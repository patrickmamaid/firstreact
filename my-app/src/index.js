import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// // {this.props.value}  called on by the board class
// class Square extends React.Component {
//     // constructor(props) { // this gets ignored anyway commenting it out
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     }
//     // }
//     render() { // every class must have a render i think ????? this is a method inside a class in jsx
//         return (
//             <button
//                 className="square"
//                 onClick={()=> this.props.onClick() }
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }


// lets rewrite the square class above as a function
function Square(props) {

    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}



class Board extends React.Component {





    renderSquare(i) { // gets index 0
        return(
            <Square
                value={this.props.squares[i]}
                onClick={()=> this.props.onClick(i) }
            /> // tell the square how it is by sending the square this value from our constructor/// by using the same index from the other render area
        );
    }


    // this is the main board basically
    // each section is calling its local renderSquare within this class passing an index value here
    // renderSquare returns
    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }


    handleClick(i){

        //We will also replace reading this.state.history with this.state.history.slice(0, this.state.stepNumber + 1). This ensures that if we “go back in time” and then make a new move from that point, we throw away all the “future” history that would now be incorrect.
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();// basically copy the array from this states squares to here per handleclick
        // interesting how you can modify an array here ..


        if (calculateWinner(squares) || squares[i] ) {
            return;
        }


        squares[i] = this.state.xIsNext ? 'X' : 'O'; // very ineteresting if statement
        this.setState({
            history: history.concat([{ //Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber : history.length, // sets the step number to the top of the history when we handle the click here
        }); // omg because no pointers lol, once you copy it here, add X to an index and send it back to setstate lol wow


        // so i have found that you should keep things immutable by doing copies apparently
        // this is especially good when you want to do historic jumps back in time
        // avoiding direct data mutation lets us keep pervious versions of the games history intact
        // and reusing them later VERY COOL
        // https://reactjs.org/tutorial/tutorial.html#setup-for-the-tutorial read DATA CHANGE WITH MUTATION


    }


// Notice in jumpTo method, we haven’t updated history property of the state. That is because state updates are merged or in more simple words React will update only the properties mentioned in setState method leaving the remaining state as is. For more info see the documentation.
    // https://reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }





    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);


        // map = function(element , index, array) { return 'whateveryouwant' // or array }
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return(
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)} >{desc}</button>
                </li>
            );
        });


        let status;
        if (winner) {
            status = 'Winner: ' + winner;

        }else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' :'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i)=> this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}



function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}



// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

