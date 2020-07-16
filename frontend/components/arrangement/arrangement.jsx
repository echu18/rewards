// List all arrangements - name, view, edit
import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
// import Draggable, { DraggableCore } from "react-draggable";
// import GridLayout from "react-grid-layout";
// import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
// import RGL, { WidthProvider } from "react-grid-layout";
// const ReactGridLayout = WidthProvider(RGL);
// import Block from "./block";

import _ from "lodash";




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

    this.createReward = this.createReward.bind(this)
    this.deleteReward = this.deleteReward.bind(this)
    this.undo = this.undo.bind(this);
    // this.row = this.row.bind(this);
  }



  componentDidMount(){
    // if saved board configuration, map the configuration upon mount
    // this.props.boardConfig()
    const defaultBoard = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
      
      if (!!(this.props.savedArrangement)) {
        this.setState({currentBoard: savedArrangement})
      } else {
        this.setState({pastBoard: defaultBoard})
      }


      // If saved board exists, set it as the currentboard and then call parseSavedBoard()

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




  undo(){
    // Switch present/future boards
    debugger
    let futureBoard = JSON.parse(JSON.stringify(this.state.currentBoard));
    let newCurrentBoard = JSON.parse(JSON.stringify(this.state.pastBoard));

    this.setState(
      {
        pastBoard: [],
        currentBoard: newCurrentBoard,
        futureBoard: futureBoard,
      },
      this.parseSavedBoard(this.state.pastBoard)
    );
  }


  parseSavedBoard(savedBoard){
    // let savedBoard = this.state.currentBoard;
  let mappedBoard = this.mappedBoard();

  Object.values(mappedBoard)[row][col] // ITERATE THRU THIS BOARD DATA AND MAP PHYSICAL REWARD PIECES
  debugger;



    for (let i=0; i < savedBoard.length; i++) {
      for (let j=0; j < 5; j++) {
        if (savedBoard[i][j] === '1') {
          let reward = this.createReward(null, i);
          reward.setAttribute('data-row', i)

          savedBoard[i][j] = reward;
        }
      }
    }

    // create reward
    // append it to find by id: block-row-col
  }


  updateBoard() {

  }



  updateBoardData(){
    let pastBoard = JSON.parse(JSON.stringify(this.state.currentBoard));
    let newBoard = JSON.parse(JSON.stringify(this.state.currentBoard));

    
    let boardBlocks = Object.values(document.getElementsByClassName('board-block'));

    for (let i=0; i < boardBlocks.length; i++) {
        let block = boardBlocks[i];

        let row = parseInt(block.dataset.row)
        let col = parseInt(block.dataset.col)

        newBoard[row][col] = block.childElementCount
      }
      
    // After a drop or a delete, update the board
    this.setState({pastBoard: pastBoard, currentBoard: newBoard})
  }



  // Drag handlers
  dragstart_handler(e) {
    console.log("dragStart");
    // Change the source element's background color to signify drag has started
    
    e.currentTarget.style.backgroundColor = "lightgreen";

    // Set the drag's format and data. Use the event target's id for the data
    // Since we're transferring an object, we'll convert it into JSON so it can be stored (will be parsed again on drop_handler)
    
    let obj = { row: e.target.dataset.row, id: e.target.id };
    let data = JSON.stringify(obj);
    // ev.dataTransfer.setData("text/plain", ev.target.id);
    
    e.dataTransfer.setData("text/plain", data);    
  }

  dragover_handler(ev) {
    console.log("dragOver");
    ev.preventDefault();
  }

  drop_handler(ev) {
    console.log("Drop");
    ev.preventDefault();
    // Get the data, which is the id of the drop target

    let rewardId = JSON.parse(ev.dataTransfer.getData("text")).id;
    let rewardRow = JSON.parse(ev.dataTransfer.getData("text")).row;
    let reward = document.getElementById(rewardId);
    
    let rewardSideBar = document.getElementById('reward-sidebar');
    let blockRow = ev.currentTarget.getAttribute("data-row");
    // let col = ev.currentTarget.getAttribute("data-col");

    if (rewardRow === blockRow && ev.target.childElementCount === 0) {
      // If dragging from reward sidebar, copy the node. If dragging from board, move the node
      // If reward still has its id from the original reward-block, then we'll need to make a copy of the piece
      // If reward has a unique id, it means it's been placed already, and subsequent drags will MOVE the piece, not copy

        if (Object.values(rewardSideBar.children).includes(reward)) {

        let nodeCopy = this.createReward(rewardId, null)

        ev.target.appendChild(nodeCopy);
      } else {
        ev.target.appendChild(reward);
      }

      let newCount = this.state.pieceCounter += 1;
      this.setState({pieceCounter: newCount})

      this.updateBoardData()
    } else {
      return;
    }
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
  }


  createReward(rewardId, row){
    let nodeCopy;

    rewardId = rewardId || row;

    let reward = document.getElementById(rewardId);

    nodeCopy = $(reward).clone(true, true)[0];
    nodeCopy.ondragstart = (e) => this.dragstart_handler(e);
    nodeCopy.id = `reward-piece-${this.state.pieceCounter}`; // Give the reward piece a unique id once it's been dragged onto the board

    nodeCopy.innerHTML += "<div class='delete-reward'>X</div>";
    
    return nodeCopy;
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




  deleteReward(e, closeBtn){
    // Removes reward piece from the board and updates rendering of board
    e.preventDefault()

    let reward = closeBtn.parentNode;

    if (!!reward.parentNode) {
      reward.parentNode.removeChild(reward) 
    }

    this.updateBoardData();
  }

  render() {
    let deleteNodes = Object.values(document.getElementsByClassName('delete-reward'));
    deleteNodes.map(el => el.addEventListener('click', e => this.deleteReward(e, el)))
    
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
        <button onClick={this.undo}>Undo</button>
      </div>
    );
  }
}

export default Arrangement;
