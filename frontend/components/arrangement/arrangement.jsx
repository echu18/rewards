// List all arrangements - name, view, edit
import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import _ from "lodash";




class Arrangement extends React.Component {
  constructor(props) {
    super(props);
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

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
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
    
    if (prevState.currentBoardData !== this.state.currentBoardData){
      document.getElementById('save-btn').innerHTML = 'Save'
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

    delete(e) {
      e.preventDefault();
      let arrangementId = this.props.match.params.arrangementId;
      this.props.destroyArrangement(arrangementId);

      this.props.history.push('/');
    }
    

  // Undo pt. 1)
  // Switch present/future boards
  undo() {

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
  // This function takes actual dom elements with getElementByClassName - this just checks the actual board and sees if each space has a reward piece
  // Then, it'll iterate through the board blocks, and update our state's currentBoardData according to whether or not it has a child element - aka, giving it a 1 or a 0
  // This is just to make sure that what we're seeing on the screen corresponds to our saved data - because, although we can initially map from saved data,
  //      if a user moves a piece or deletes a piece, this function is kind of the bridge between the saved data in our state and what is displayed on the screen through the dom
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
    
    
    if (!!reward.parentNode) {
      reward.parentNode.removeChild(reward);
      this.setState({pastBoardData: currentBoard, futureBoardData: []})
      this.updateBoardData(), ()=> this.setState({newCurrentBoardData: this.state.currentBoardData});
    }
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
    // Set the drag's format and data. Use the event target's id for the data
    // Since we're transferring an object, we'll convert it into JSON so it can be stored (will be parsed again on drop_handler)

    let obj = { row: e.target.dataset.row, id: e.target.id };
    let data = JSON.stringify(obj);
    e.dataTransfer.setData("text/plain", data);
  }

  dragover_handler(ev) {
    ev.preventDefault();
  }

  drop_handler(ev) {
    ev.preventDefault();
    // Get id of the drop target through dataTransfer
    let rewardId = JSON.parse(ev.dataTransfer.getData("text")).id;
    let rewardRow = JSON.parse(ev.dataTransfer.getData("text")).row;
    let reward = document.getElementById(rewardId);

    let rewardSideBar = document.getElementById("reward-sidebar");
    let blockRow = ev.currentTarget.getAttribute("data-row");

    // Checks to make sure it's the same row (aka swimlane)
    if (rewardRow === blockRow && ev.target.childElementCount === 0) {
      // If dragging from reward sidebar, copy the node. If dragging from board, move the node
      // If reward still has its id from the original reward-block, then we'll need to make a copy of the piece
      // If reward has a unique id, it means it's been placed already, and subsequent drags will MOVE the piece, not copy


      // Checks id to see if it was originally dragged from left sidebar or not
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

        

            <div id="reward-sidebar">
              <div
                id="0"
                className="reward-block"
                data-row="0"
                onDragStart={(event) => this.dragstart_handler(event)}
                draggable="true"
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
                style={{ backgroundColor: '#F3BF3E', opacity: 0.9 }}
              >
                R2
              </div>
              <div
                id="2"
                className="reward-block"
                data-row="2"
                onDragStart={(event) => this.dragstart_handler(event)}
                draggable="true"
                style={{ backgroundColor: '#F3BF3E', opacity: 0.9 }}
                >
                R3
              </div>
              <div
                id="3"
                className="reward-block"
                data-row="3"
                onDragStart={(event) => this.dragstart_handler(event)}
                draggable="true"
                style={{ backgroundColor: '#F3BF3E', opacity: 0.9 }}
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
              >
                R5
              </div>
            </div>


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


              
        </div>
        
          <div className='action-panel'>
              <div className='action-btns'>
                <button id='undo-btn' onClick={this.undo} disabled={this.state.pastBoardData.length === 0 ? true : !!checkFutureEqualsPast(this.state) ? true : false} >Undo</button>
                <button id='redo-btn' onClick={this.redo} disabled={this.state.futureBoardData.length === 0 ? true : !!checkCurrentEqualsFuture(this.state) ? true : false} >Redo</button>
              </div>
        
        
              <label>Name this arrangement:
                <input id='name-input' type="text" onChange={this.handleInput('name')} value={!!this.state.name ? this.state.name : null}/> 
              </label>

              <div className='save-delete-btns'>
                <button id='save-btn' onClick={e=>this.save(e, this.state.currentBoardData, this.state.name)}>Save</button>
                {this.props.match.path.includes('edit') ? <button id='delete-btn' onClick={e=>this.delete(e)}>Delete</button> : null }
              </div>
          
          </div>
      </div>
    );
  }
}

export default Arrangement;


