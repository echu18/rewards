// List all arrangements - name, view, edit
import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import Draggable, { DraggableCore } from "react-draggable";
// import GridLayout from "react-grid-layout";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

import Block from './block'

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

    this.onDrop = this.onDrop.bind(this)
  }


  // translate coordinates into true/false for rewards hash
  // translate rewards hash back into true/false
  




    onDrop(e) {
        e.preventDefault();
        alert('dragover')
    }

  newBlock(e, rowNum){
    e.preventDefault()
    let clickPos = (e.clientX/window.innerHeight) * 100

    let xPos = Math.floor(clickPos/100) * 100

    let block;

    switch (rowNum){
      case 'row1':
        block = [
          <Block
            xPos={xPos}
            defaultPosition={{ x: 0, y: 0 }}
            id={rowNum + "-" + (this.state[rowNum].length + 1)}
          />,
        ];
      case 'row2':
        block = [
          <Block
            xPos={xPos}
            defaultPosition={{ x: 0, y: 100 }}
            id={rowNum + "-" + (this.state[rowNum].length + 1)}
          />,
        ];
      case 'row3':
        block = [
          <Block
            xPos={xPos}
            defaultPosition={{ x: 0, y: 200 }}
            id={rowNum + "-" + (this.state[rowNum].length + 1)}
          />,
        ];
      case 'row4':
        block = [
          <Block
            xPos={xPos}
            defaultPosition={{ x: 0, y: 300 }}
            id={rowNum + "-" + (this.state[rowNum].length + 1)}
          />,
        ];
      case 'row5':
        block = [
          <Block
            xPos={xPos}
            defaultPosition={{ x: 0, y: 400 }}
            id={rowNum + "-" + (this.state[rowNum].length + 1)}
          />,
        ];

    }
        
    this.setState({[rowNum]: this.state[rowNum].concat(block)})
    //if no coordinates are given
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;

   debugger

    return (
      <div className="arrangement-container">
        <h3>Rewards Arrangement</h3>

        <div className="board">
          <div className="rewards">
            <h3>Rewards</h3>

            <div className="rewards-header">
              <div>R1</div>
              <div>R2</div>
              <div>R3</div>
              <div>R4</div>
              <div>R5</div>
            </div>
          </div>

          <div className="categories">
            <h3>Categories</h3>
            <div className="cat-header">
              <div>C1</div>
              <div>C2</div>
              <div>C3</div>
              <div>C4</div>
              <div>C5</div>
            </div>

            <div
              className="row-1 row"
              onDoubleClick={(e) => this.newBlock(e, "row1")}
            >
              {this.state.row1.map((block) => block)}

              {/* <div onDragEnd={(e) => this.onDrop(e)}>R1</div>
              <div onDragEnd={(e) => this.onDrop(e)}>R2</div>
              <div onDragEnd={(e) => this.onDrop(e)}>R3</div>
              <div onDragEnd={(e) => this.onDrop(e)}>R4</div>
              <div onDragEnd={(e) => this.onDrop(e)}>R5</div> */}
            </div>

            <div
              className="row-2 row"
              onDoubleClick={(e) => this.newBlock(e, "row2")}
            >
              {this.state.row2.map((block) => block)}
            </div>

            <div
              className="row-3"
              onDoubleClick={(e) => this.newBlock(e, "row3")}
            >
              {this.state.row3.map((block) => block)}
            </div>

            <div
              className="row-4"
              onDoubleClick={(e) => this.newBlock(e, "row4")}
            >
              {this.state.row4.map((block) => block)}
            </div>

            <div
              className="row-5"
              onDoubleClick={(e) => this.newBlock(e, "row5")}
            >
              {this.state.row5.map((block) => block)}
            </div>
          </div>
        </div>

        {/* <Draggable grid={[200, 200]} axis="x" {...dragHandlers}>
          <div className="box">I snap to a 200 x 200 grid</div>
        </Draggable> */}

        <button>Save Arrangement</button>
        {/* 
        <ResponsiveGridLayout
          className="layout"
          {...this.props}
          layouts={layout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          <div key="1">1</div>
          <div key="2">2</div>
          <div key="3">3</div>
        </ResponsiveGridLayout> */}
      </div>
    );
  }
}

// Arrangement.defaultProps = {
//       isDraggable: false

// //   className: "layout",
// //   rowHeight: 30,
// //   onLayoutChange: function () {},
// //   cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
// //   initialLayout: generateLayout(),
// };

export default Arrangement;
