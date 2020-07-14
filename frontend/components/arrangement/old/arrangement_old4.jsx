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
    };

    this.dragover_handler = this.dragover_handler.bind(this)
    this.dragstart_handler = this.dragstart_handler.bind(this)
    this.drop_handler = this.drop_handler.bind(this)
    this.row = this.row.bind(this)
  }

  // translate coordinates into true/false for rewards hash
  // translate rewards hash back into true/false

 

  newBlock(e, rowNum, newBlock) {
    e.preventDefault();
    // let clickPos = (e.clientX / window.innerHeight) * 100;

    // let xPos = Math.floor(clickPos / 100) * 100;
    newBlock.setData(rowNum)

    this.setState({
      [rowNum]: this.state[rowNum].concat([
        newBlock
      ]),
    });


    
    //if no coordinates are given
  }

  
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
        var data = ev.dataTransfer.getData("text");

        ev.target.appendChild(document.getElementById(data));
        // Clear the drag data cache (for all formats/types)
        ev.dataTransfer.clearData();
    }



    row() {
        let row = []
        for (let i=0; i < 5; i++) {
            row.push(
              <div
                id="target"
                onDrop={(event) => this.drop_handler(event)}
                onDragOver={(event) => this.dragover_handler(event)}
              >
                a
              </div>
            );
        }
        return row;
    };


  render() {

    const newBlock = (
      <div
        id="source"
        onDragStart={(event) => this.dragstart_handler(event)}
        draggable="true"
      >
        R1
      </div>
    );


  

 
    
    return (
      <div className="arrangement-container">
        <h3>Rewards Arrangement</h3>

        <div className="board">
          <div className="rewards">
            <h3>Rewards</h3>

            <div className="rewards-header">
              <div
              // id="source"
              // onDragStart={(event) => this.dragstart_handler(event)}
              // draggable="true"
              >
                R1
              </div>
              <div>R2</div>
              <div>R3</div>
              <div>R4</div>
              <div>R5</div>
            </div>
          </div>

          <div className="categories">
            <h3>Categories</h3>
            {/* <div className="cat-header"> */}
            <div
              className="row"
              onDoubleClick={(e) => this.newBlock(e, "row1", newBlock)}
            >
              {/* <h3>C1</h3> */}
              {this.row()}
              {this.state.row1.map((block) => block)}
            </div>

            <div
              className="row"
              onDoubleClick={(e) => this.newBlock(e, "row2", newBlock)}
            >
              {/* <h3>C1</h3> */}
              {this.row()}
              {this.state.row2.map((block) => block)}
            </div>

            <div
              className="row"
              onDoubleClick={(e) => this.newBlock(e, "row3", newBlock)}
            >
              {/* <h3>C1</h3> */}
              {this.row()}
              {this.state.row3.map((block) => block)}
            </div>

            <div
              className="row"
              onDoubleClick={(e) => this.newBlock(e, "row4", newBlock)}
            >
              {/* <h3>C1</h3> */}
              {this.row()}
              {this.state.row4.map((block) => block)}
            </div>

            <div
              className="row"
              onDoubleClick={(e) => this.newBlock(e, "row5", newBlock)}
            >
              {/* <h3>C1</h3> */}
              {this.row()}
              {this.state.row5.map((block) => block)}
            </div>

            {/* <div>C2</div>
                <div>C3</div>
                <div>C4</div>
                <div>C5</div> */}
            {/* </div> */}
          </div>

          {/* <div
            id="target"
            onDrop={(event) => this.drop_handler(event)}
            onDragOver={(event) => this.dragover_handler(event)}
          >
            Drop Zone
          </div>
          <div
            id="target"
            onDrop={(event) => this.drop_handler(event)}
            onDragOver={(event) => this.dragover_handler(event)}
          >
            Drop Zone2
          </div> */}
        </div>

        <button>Save Arrangement</button>
      </div>
    );
  }
}


export default Arrangement;
