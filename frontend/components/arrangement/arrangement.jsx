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
      // row1: [],
      // row2: [],
      // row3: [],
      // row4: [],
      // row5: [],
      pastBoard: [],
      currentBoard: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      futureBoard: [],
      pieceCounter: 0
    };

    this.dragover_handler = this.dragover_handler.bind(this);
    this.dragstart_handler = this.dragstart_handler.bind(this);
    this.drop_handler = this.drop_handler.bind(this);
    // this.row = this.row.bind(this);
  }



  componentDidMount(){
    // if saved board configuration, map the configuration upon mount
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




  updateBoard(){

    // After a drop or a delete, update the board
  }



  // Drag handlers
  dragstart_handler(e, dropeffect) {
    console.log("dragStart");
    // Change the source element's background color to signify drag has started

    
    e.currentTarget.style.backgroundColor = "lightgreen";

    // Set the drag's format and data. Use the event target's id for the data
    // Since we're transferring an object, we'll convert it into JSON so it can be stored (will be parsed again on drop_handler)
    
    let obj = { row: e.target.dataset.row, id: e.target.id };
    let data = JSON.stringify(obj);
    // ev.dataTransfer.setData("text/plain", ev.target.id);
    

    
    e.dataTransfer.setData("text/plain", data);
    // e.dataTransfer.effectAllowed = 'move';
    
    // e.dataTransfer.dropEffect = 'move';
    
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
      let rewardId = JSON.parse(ev.dataTransfer.getData("text")).id;
      let rewardRow = JSON.parse(ev.dataTransfer.getData("text")).row;


    let reward = document.getElementById(rewardId);

    let rewardSideBar = document.getElementById('reward-sidebar');
    let blockRow = ev.currentTarget.getAttribute("data-row");
    let col = ev.currentTarget.getAttribute("data-col");

    if (rewardRow === blockRow && ev.target.childElementCount === 0) {

      
      // If dragging from reward sidebar, copy the node. If dragging from board, move the node
        
      // If reward still has its id from the original reward-block, then we'll need to make a copy of the piece
      // If reward has a unique id, it means it's been placed already, and subsequent drags will MOVE the piece, not copy

        if (Object.values(rewardSideBar.children).includes(reward)) {

          let nodeCopy = $(reward).clone(true, true)[0];
          nodeCopy.ondragstart = e => this.dragstart_handler(e);
          nodeCopy.id = `reward-piece-${this.state.pieceCounter}`; // Give the reward piece a unique id once it's been dragged onto the board
          
          nodeCopy.innerHTML += "<div class='delete-reward'>X</div>"


        ev.target.appendChild(nodeCopy);
      } else {
        ev.target.appendChild(reward);
      }

      let newCount = this.state.pieceCounter += 1;
      this.setState({pieceCounter: newCount})

    } else {
      return;
    }
    // Clear the drag data cache (for all formats/types)
    // ev.dataTransfer.clearData();
  }



// Board spaces and reward pieces
  mappedBoard() {
    let newBoard = []

    for (let i = 0; i < this.state.currentBoard.length; i++) {
      let row = this.state.currentBoard[i].map((block, j) =>
        this.block(i, j)
      );
      newBoard.push(row)
    }
    return newBoard;
  }

  block(row, col) {
    let id = 'block' + row + '-' + col;

    return (
      <div id={id} className="board-block" data-row={row} data-col={col} onDrop={(event) => this.drop_handler(event)} onDragOver={(event) => this.dragover_handler(event)} onDoubleClick={e =>this.addReward(e, row)}>
        {row}-{col}
      </div>
    );
  }



  

  // createReward(row){

  //   // let reward = document.createElement('div');
  //   // reward.setAttribute("id", `r-${row}`);
  //   // reward.setAttribute("className", "reward-block");
  //   // reward.setAttribute("data-row", row);
  //   // // reward.setAttribute("onDragStart", 'this.dragstart_handler');
  //   // reward.setAttribute("draggable", true);
  //   // reward.innerHTML = `R${row}`

  //   // document.getElementById(`r-${row}`).addEventListener('dragstart', e=> this.dragover_handler(e))



  //   return (<div id={"r-"+row} className="reward-block" data-row={row} onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R{row}</div>)
  // }


  // addReward(e, row){
  //   e.preventDefault();

  // let reward = document.createElement('div');
  //   reward.setAttribute("id", `r-${row}`);
  //   reward.setAttribute("className", "reward-block");
  //   reward.setAttribute("data-row", row);
  //   reward.setAttribute("ondragstart", `this.dragstart_handler(${e})`);
  //   reward.setAttribute("draggable", true);
  //   reward.innerHTML = `R${row}`

  //   // reward.addEventListener('dragstart', function(e){
  //   //   e.preventDefault()
  //   //   this.dragstart_handler(e)
  //   // })

  //   // reward.innerHTML = `<div id={"r-" + row} className="reward-block" data-row={row} onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R{row}</div>`;
    
    
  //   // let rewardPiece = <div id={"r-" + row} className="reward-block" data-row={row} onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R{row}</div>
  //   e.target.appendChild(reward);
  //   // document.getElementById(id).appendChild(rewardPiece);
  // }

  render() {
    let deleteNodes = Object.values(document.getElementsByClassName('delete-reward'));
    deleteNodes.map(el => el.addEventListener('click', function(e){e.preventDefault(); alert('hi')}))
    
    
    // .map(el => el.addEventListener('click', function(e){e.preventDefault(); alert('hi')}))





    return (
      <div className="arrangement-container">
        <h3>Rewards Arrangement</h3>

        <div className="board">
          <div className="rewards">
            <div className="rewards-header">
              <h3>Rewards</h3>
            </div>

            {/* <div id="reward-box-0" className='reward-placemark' onMouseDown={e => this.addReward(e, 0)}>R1</div>
            <div id="reward-box-1" className='reward-placemark'>R2</div>
            <div id="reward-box-2" className='reward-placemark'>R3</div>
            <div id="reward-box-3" className='reward-placemark'>R4</div>
            <div id="reward-box-4" className='reward-placemark'>R5</div> */}


            <div id='reward-sidebar'>
              <div id="0" className="reward-block" data-row='0' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R1</div>
              <div id="1" className="reward-block" data-row='1' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R2</div>
              <div id="2" className="reward-block" data-row='2' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R3</div>
              <div id="3" className="reward-block" data-row='3' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R4</div>
              <div id="4" className="reward-block" data-row='4' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R5</div>
            </div>




            // Saved reward pieces - singular
            {/* <div id="r-1" className="reward-block" data-row='0' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R1</div>
            <div id="r-2" className="reward-block" data-row='1' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R2</div>
            <div id="r-3" className="reward-block" data-row='2' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R3</div>
            <div id="r-4" className="reward-block" data-row='3' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R4</div>
            <div id="r-5" className="reward-block" data-row='4' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R5</div> */}
    
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
