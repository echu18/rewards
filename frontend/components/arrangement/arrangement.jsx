// List all arrangements - name, view, edit
import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import _ from "lodash";




class Arrangement extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.state = {
      name: "",
      pastBoardData: [],
      currentBoardData: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      futureBoardData: [],
      pieceCounter: 0,
      currentBoardBlocks: []
    };

    this.dragover_handler = this.dragover_handler.bind(this);
    this.dragstart_handler = this.dragstart_handler.bind(this);
    this.drop_handler = this.drop_handler.bind(this);

    this.createReward = this.createReward.bind(this);
    this.deleteReward = this.deleteReward.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.mappedBoard = this.mappedBoard.bind(this);
    this.attachDeleteRewardListener = this.attachDeleteRewardListener.bind(this);

    this.handleInput = this.handleInput.bind(this);
    this.mapSavedBoard = this.mapSavedBoard.bind(this);
    // this.row = this.row.bind(this);
  }

  componentDidMount() {
    const defaultBoard = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    if (!!this.props.match.params.arrangementId || !!this.props.arrangement){
      
      // If saved board exists, set it as the currentboardData and then call parseBoard()
      this.props.fetchArrangement(this.props.match.params.arrangementId)
      .then(() => {
          let arrangement = this.props.arrangement;
          let parsedBoard = []

          parsedBoard.push(JSON.parse(arrangement.r0))
          parsedBoard.push(JSON.parse(arrangement.r1))
          parsedBoard.push(JSON.parse(arrangement.r2))
          parsedBoard.push(JSON.parse(arrangement.r3))
          parsedBoard.push(JSON.parse(arrangement.r4))

          this.setState({name: arrangement.name})
        this.mapSavedBoard(parsedBoard)  
        })


      } else {
        this.mappedBoard(defaultBoard);
      }
  }


  componentDidUpdate(prevProps, prevState){
    debugger
    if (prevState.currentBoardData !== this.state.currentBoardData){
      document.getElementById('save-btn').innerHTML = 'Save Arrangement'
    }

    if (prevState.name !== this.state.name){
      document.getElementById('name-input').style.border = "1px solid gainsboro";
    }
  }




    mapSavedBoard(board) {
      this.mappedBoard(board)
      this.setState({ currentBoardData: board });
    }

    handleInput(type) {
      return (e) => {
        this.setState({ [type]: e.target.value });
      };
    
    }

    save(e, board, name){
      e.preventDefault();
      
      if (this.state.name === "") {
          document.getElementById('name-input').style.border = "1px solid red"
          return;
      }

      let path = this.props.match.path;

      let r0 = JSON.stringify(board[0]);
      let r1 = JSON.stringify(board[1]);
      let r2 = JSON.stringify(board[2]);
      let r3 = JSON.stringify(board[3]);
      let r4 = JSON.stringify(board[4]);
      
      let arrangement = { r0: r0, r1: r1, r2: r2, r3: r3, r4: r4 , name: name}
      
      
        if (path.includes('create')) {
          this.props.addArrangement(arrangement);
        } else if (path.includes('edit')) {
          this.props.modifyArrangement(parseInt(this.props.match.params.arrangementId), arrangement)
        }
        document.getElementById('save-btn').innerHTML = 'Saved.'
    }

    

















  // Undo pt. 1)
  // Switch present/future boards
  undo() {
    // if (this.state.pastBoardData.length === 0) return;
    let futureBoardData = JSON.parse(JSON.stringify(this.state.currentBoardData));
    let newCurrentBoardData = JSON.parse(JSON.stringify(this.state.pastBoardData));
    
    
    this.setState({
        pastBoardData: [],
        currentBoardData: newCurrentBoardData,
        futureBoardData: futureBoardData,
      }, function(){
        this.mappedBoard(this.state.currentBoardData);
        // this.updateBoardData();
      } );
  }

  redo() {
    // if (this.state.pastBoardData.length === 0) return;
    let newPastBoardData = JSON.parse(JSON.stringify(this.state.currentBoardData));
    let newCurrentBoardData = JSON.parse(JSON.stringify(this.state.futureBoardData));
    
    this.setState({
        futureBoardData: [],
        currentBoardData: newCurrentBoardData,
        pastBoardData: newPastBoardData,
      }, function(){
        this.mappedBoard(this.state.currentBoardData);
        // this.updateBoardData();
      } );
  }

  

  // updateBoard() {}

  // After a drop or a delete, update the board
  updateBoardData() {
    let pastBoardData = JSON.parse(JSON.stringify(this.state.currentBoardData));
    let newBoard = JSON.parse(JSON.stringify(this.state.currentBoardData));

    let boardBlocks = Object.values(
      document.getElementsByClassName("board-block")
    );

    for (let i = 0; i < boardBlocks.length; i++) {
      let block = boardBlocks[i];

      let row = parseInt(block.dataset.row);
      let col = parseInt(block.dataset.col);

      newBoard[row][col] = block.childElementCount;
    }

    // this.setState({ pastBoardData: pastBoardData, currentBoardData: newBoard });
    this.setState({ pastBoardData: pastBoardData, currentBoardData: newBoard });
  }



  // Board spaces and reward pieces

  // This just returns a board with blocks
  // Iterates through board data and maps blocks and reward pieces

  mappedBoard(boardData) {
    // First, replace current board blocks with new blank board blocks
    let newBoard = [];

    for (let i = 0; i < boardData.length; i++) {     
      let row = boardData[i].map((block, j) => {
        return this.block(i, j)
      })
      newBoard.push(row);
    }
    this.setState({currentBoardBlocks: newBoard}, () => mapRewards(this.createReward, this.attachDeleteRewardListener));


    // Next, grab all the new blank blocks we just mapped and iterate thru to append reward pieces
    function mapRewards(createReward, attachDeleteRewardListener){
      let flattenedData = boardData.flat(); // Need to flatten boardData since its a nested array, whereas the boardBlocks we grab by className is just one big arr
      
      let boardBlocks = document.getElementsByClassName('board-block');

        for (let i = 0; i < flattenedData.length; i++) {     
            let newBlock = boardBlocks[i];
            let row;

            if (i <= 4){
              row = 0
            } else if (i > 4 && i <= 9) {
              row = 1
            } else if (i > 9 && i <= 14) {
              row = 2
            } else if (i > 14 && i <= 19){
              row = 3
            } else {
              row = 4;
            }
            
            if (flattenedData[i] === 1) { 
              if (newBlock.childElementCount < 1) {
                let reward = createReward(null, row);
                reward.setAttribute("data-row", row);
                newBlock.appendChild(reward);
                attachDeleteRewardListener();
              }
            } else if (flattenedData[i] === 0) {
              if (newBlock.childElementCount > 0) {
                for (let j=0; j < newBlock.childElementCount; j++){
                  newBlock.removeChild(newBlock.children[j])
                }
              }
            }
          }
        } 
  }

  block(row, col) {
    let id = "block" + row + "-" + col;

    return (
      <div
        id={id}
        className="board-block"
        data-row={row}
        data-col={col}
        onDrop={(event) => this.drop_handler(event)}
        onDragOver={(event) => this.dragover_handler(event)}
      // onDoubleClick={(e) => this.addReward(e, row)}
      >
        {/* {row}-{col} */}
      </div>
    );
  }


  createReward(rewardId, row) {
    
    let nodeCopy;

    rewardId = rewardId || row;

    let reward = document.getElementById(rewardId);

    let newCount = (this.state.pieceCounter += 1);
    this.setState({ pieceCounter: newCount });


    nodeCopy = $(reward).clone(true, true)[0];
    nodeCopy.ondragstart = (e) => this.dragstart_handler(e);
    nodeCopy.id = `reward-piece-${this.state.pieceCounter}`; // Give the reward piece a unique id once it's been dragged onto the board
    nodeCopy.className='reward-piece'

    nodeCopy.innerHTML += "<div class='delete-reward'>x</div>";

    return nodeCopy;
  }



  // Removes reward piece from the board and updates rendering of board
  deleteReward(e, closeBtn) {
    e.preventDefault();
    let currentBoard = JSON.parse(JSON.stringify(this.state.currentBoardData));
    let reward = closeBtn.parentNode;
    
    // this.setState({ futureBoardData: [] }, () => {this.updateBoardData()})
    
    if (!!reward.parentNode) {
      reward.parentNode.removeChild(reward);
      this.setState({pastBoardData: currentBoard, futureBoardData: []})
      this.updateBoardData(), ()=> this.setState({newCurrentBoardData: this.state.currentBoardData});
    }

    let rewardCount = document.getElementsByClassName("reward-piece").length
    // this.updateBoardData()
      
    // if (rewardCount === 0){
    //   this.setState({ futureBoardData: currentBoard}, () => {this.updateBoardData(); this.mappedBoard(currentBoard)})
    // } else {
    //   this.setState({ futureBoardData: [] }, () => this.updateBoardData())
    // }
  }

  attachDeleteRewardListener() {
    let deleteNodes = Object.values(
      document.getElementsByClassName("delete-reward")
    );
    deleteNodes.map((el) =>
      el.addEventListener("click", (e) => {this.deleteReward(e, el)})
    );
  }
  

 


  // Drag handlers
  dragstart_handler(e) {
    console.log("dragStart");
    
    // Change the source element's background color to signify drag has started
    // switch (e.currentTarget.id) {
    //   case "0":
    //     e.currentTarget.style.backgroundColor = "lightgreen";
    //   case "1":
    //     e.currentTarget.style.backgroundColor = "red";
    //   case "2":
    //     e.currentTarget.style.backgroundColor = "blue";
    //   case "3":
    //     e.currentTarget.style.backgroundColor = "pink";
    //   case "4":
    //     e.currentTarget.style.backgroundColor = "orange";
    // }

    // Set the drag's format and data. Use the event target's id for the data
    // Since we're transferring an object, we'll convert it into JSON so it can be stored (will be parsed again on drop_handler)

    let obj = { row: e.target.dataset.row, id: e.target.id };
    let data = JSON.stringify(obj);
    e.dataTransfer.setData("text/plain", data);
  }

  dragover_handler(ev) {
    console.log("dragOver");
    ev.preventDefault();
  }

  drop_handler(ev) {
    console.log("Drop");
    ev.preventDefault();
    // Get id of the drop target through dataTransfer
    let rewardId = JSON.parse(ev.dataTransfer.getData("text")).id;
    let rewardRow = JSON.parse(ev.dataTransfer.getData("text")).row;
    let reward = document.getElementById(rewardId);

    let rewardSideBar = document.getElementById("reward-sidebar");
    let blockRow = ev.currentTarget.getAttribute("data-row");



    // debugger
    // if (blockRow === "0") {
    //   reward.style.backgroundColor = "lightgreen";
    // } else if (blockRow === "1"){
    //   reward.style.backgroundColor = "red";
    // } else if (blockRow === "2"){
    //     reward.style.backgroundColor = "blue";
    // } else if (blockRow === "3"){
    //     reward.style.backgroundColor = "pink";
    // } else {
    //     reward.style.backgroundColor = "orange";
    // }
    



    if (rewardRow === blockRow && ev.target.childElementCount === 0) {
      // If dragging from reward sidebar, copy the node. If dragging from board, move the node
      // If reward still has its id from the original reward-block, then we'll need to make a copy of the piece
      // If reward has a unique id, it means it's been placed already, and subsequent drags will MOVE the piece, not copy

      if (Object.values(rewardSideBar.children).includes(reward)) {
        let nodeCopy = this.createReward(rewardId, null);

        ev.target.appendChild(nodeCopy);
      } else {
        ev.target.appendChild(reward);
      }

      let newCount = (this.state.pieceCounter += 1);
      this.setState({ pieceCounter: newCount, futureBoardData: [] });

      this.updateBoardData();
    } else {
      return;
    }
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
  }

 

  render() {
    function checkCurrentEqualsFuture(state){
      let current = Object.values(state.currentBoardData);
      let future = Object.values(state.futureBoardData);
      
      for (let i=0; i < current.length; i++){
        if (current[i] !== future[i]) {
          return false;
        }
      }
      return true;
    }

    function checkFutureEqualsPast(state){
      let future = Object.values(state.futureBoardData);
      let past = Object.values(state.pastBoardData);
      
      for (let i=0; i < 5; i++){
        if (past[i] !== future[i]) {
          return false;
        }
      }
      return true;
    }

    this.attachDeleteRewardListener();

    return (
      <div className="arrangement-container">
        {/* <h3>Rewards Arrangement</h3> */}

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

            <div id="reward-sidebar">
              <div
                id="0"
                className="reward-block"
                data-row="0"
                onDragStart={(event) => this.dragstart_handler(event)}
                draggable="true"
                // style={{ backgroundColor: 'lightgreen', opacity: 0.9 }}
                style={{ backgroundColor: '#F3BF3E', opacity: 0.9 }}
              >
                R1
              </div>
              <div
                id="1"
                className="reward-block"
                data-row="1"
                onDragStart={(event) => this.dragstart_handler(event)}
                draggable="true"
                // style={{ backgroundColor: 'lightgreen', opacity: 0.9 }}
                style={{ backgroundColor: '#F3BF3E', opacity: 0.9 }}
                // style={{ backgroundColor: '#ECECED', opacity: 0.9 }}

              >
                R2
              </div>
              <div
                id="2"
                className="reward-block"
                data-row="2"
                onDragStart={(event) => this.dragstart_handler(event)}
                draggable="true"
                // style={{ backgroundColor: '#F9DAE4', opacity: 0.9 }}
                style={{ backgroundColor: '#F3BF3E', opacity: 0.9 }}
                // style={{ backgroundColor: 'lightgreen', opacity: 0.9 }}
                >
                R3
              </div>
              <div
                id="3"
                className="reward-block"
                data-row="3"
                onDragStart={(event) => this.dragstart_handler(event)}
                draggable="true"
                // style={{ backgroundColor: 'lightgreen', opacity: 0.9 }}
                style={{ backgroundColor: '#F3BF3E', opacity: 0.9 }}
                // style={{ backgroundColor: '#ECECED', opacity: 0.9 }}
                >
                R4
              </div>
              <div
                id="4"
                className="reward-block"
                data-row="4"
                onDragStart={(event) => this.dragstart_handler(event)}
                draggable="true"
                style={{ backgroundColor: '#F3BF3E', opacity: 0.9 }}
                // style={{ backgroundColor: '#ECECED', opacity: 0.9 }}
                // style={{ backgroundColor: 'lightgreen', opacity: 0.9 }}
              >
                R5
              </div>
            </div>

            {/* <div id="r-1" className="reward-block" data-row='0' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R1</div>
            <div id="r-2" className="reward-block" data-row='1' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R2</div>
            <div id="r-3" className="reward-block" data-row='2' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R3</div>
            <div id="r-4" className="reward-block" data-row='3' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R4</div>
            <div id="r-5" className="reward-block" data-row='4' onDragStart={(event) => this.dragstart_handler(event)} draggable="true">R5</div> */}
          </div>

          <div className="categories">
            <h3>Categories</h3>
            <div className='cat-header'>
              <p>C1</p>
              <p>C2</p>
              <p>C3</p>
              <p>C4</p>
              <p>C5</p>
            </div>
            <div className="inner-grid">{this.state.currentBoardBlocks}</div>
          </div>

              {/* <button onClick={this.undo} disabled={true} >Undo</button> */}
              {/* <button onClick={this.undo} disabled={this.state.pastBoardData.length > 0 ? false : true} >Undo</button> */}
              
        </div>
        
          <div className='action-panel'>
              <div className='action-btns'>
                <button id='undo-btn' onClick={this.undo} disabled={this.state.pastBoardData.length === 0 ? true : !!checkFutureEqualsPast(this.state) ? true : false} >Undo</button>
                <button id='redo-btn' onClick={this.redo} disabled={this.state.futureBoardData.length === 0 ? true : !!checkCurrentEqualsFuture(this.state) ? true : false} >Redo</button>
              </div>
        
        
              <label>Name this arrangement:
                <input id='name-input' type="text" onChange={this.handleInput('name')} value={!!this.state.name ? this.state.name : null}/> 
              </label>
              <button id='save-btn' onClick={e=>this.save(e, this.state.currentBoardData, this.state.name)}>Save Arrangement</button>
          
          </div>
      </div>
    );
  }
}

export default Arrangement;



// Save just in case I mess up
  // mappedBoard() {
  //   let newBoard = [];

  //   for (let i = 0; i < this.state.currentBoardData.length; i++) {
  //     let row = this.state.currentBoard[i].map((block, j) => this.block(i, j));
  //     newBoard.push(row);
  //   }
  //   return newBoard;
  // }