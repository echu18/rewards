// List all arrangements - name, view, edit
import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import Draggable, { DraggableCore } from "react-draggable";
import GridLayout from "react-grid-layout";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

import Block from "./block";

class Arrangement extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.state = {
      row1: [],
      row2: [],
      row3: [],
      row4: [],
      row5: [],
      board: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
    };

    this.dragover_handler = this.dragover_handler.bind(this);
    this.dragstart_handler = this.dragstart_handler.bind(this);
    this.drop_handler = this.drop_handler.bind(this);
    // this.row = this.row.bind(this);
  }

  // translate coordinates into true/false for rewards hash
  // translate rewards hash back into true/false

  // newBlock(e, rowNum, newBlock) {
  //   e.preventDefault();
  //   // let clickPos = (e.clientX / window.innerHeight) * 100;

  //   // let xPos = Math.floor(clickPos / 100) * 100;
  //   newBlock.setData(rowNum);

  //   this.setState({
  //     [rowNum]: this.state[rowNum].concat([newBlock]),
  //   });

  //   //if no coordinates are given
  // }

  dragstart_handler(ev) {
    console.log("dragStart");
    // Change the source element's background color to signify drag has started

    ev.currentTarget.style.border = "dashed";
    // Set the drag's format and data. Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", ev.target.id);
    // event.dataTransfer.effectAllowed = 'none';
  }

  dragover_handler(ev) {
    console.log("dragOver");
    ev.preventDefault();
  }

  drop_handler(ev) {
    console.log("Drop");
    ev.preventDefault();
    // Get the data, which is the id of the drop target
    debugger

    var data = ev.dataTransfer.getData("text");
    var row = ev.currentTarget.getAttribute("data-row");
    var col = ev.currentTarget.getAttribute("data-col");

    ev.target.appendChild(document.getElementById(data));
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
  }

  // row() {
  //   let row = [];
  //   for (let i = 0; i < 5; i++) {
  //     row.push(
  //       <div
  //         id="target"
  //         onDrop={(event) => this.drop_handler(event)}
  //         onDragOver={(event) => this.dragover_handler(event)}
  //       >
  //         a
  //       </div>
  //     );
  //   }
  //   return row;
  // }

  mappedBoard() {
    let newBoard = []

    for (let i = 0; i < this.state.board.length; i++) {
      let row = this.state.board[i].map((block, j) =>
        this.block(i, j)
      );
      newBoard.push(row)
    }
    return newBoard;
  }

  block(row, col) {
    return (
      <div id='target' className="board-block" data-row={row} data-col={col} onDrop={(event) => this.drop_handler(event)}                 onDragOver={(event) => this.dragover_handler(event)}
>
        {row}-{col}
      </div>
    );
  }

  render() {
    return (
      <div className="arrangement-container">
        <h3>Rewards Arrangement</h3>

        <div className="board">
          <div className="rewards">
            <div className="rewards-header">
              <h3>Rewards</h3>
            </div>

            <div id="r-1" className="board-block" onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R1</div>
            <div id="r-2" className="board-block" onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R2</div>
            <div id="r-3" className="board-block" onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R3</div>
            <div id="r-4" className="board-block" onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R4</div>
            <div id="r-5" className="board-block" onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R5</div>
    
          </div>

          <div className="categories">
            <h3>Categories</h3>
            <div className="inner-grid">{this.mappedBoard()}</div>
          </div>
        </div>

        <button>Save Arrangement</button>
      </div>
    );
  }
}

export default Arrangement;
