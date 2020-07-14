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

    this.onDrop = this.onDrop.bind(this);
  }

  // translate coordinates into true/false for rewards hash
  // translate rewards hash back into true/false

  onDrop(e) {
    e.preventDefault();
    alert("dragover");
  }

  newBlock(e, rowNum) {
    e.preventDefault();
    let clickPos = (e.clientX / window.innerHeight) * 100;

    let xPos = Math.floor(clickPos / 100) * 100;

    this.setState({
      [rowNum]: this.state[rowNum].concat([
        <Block
          xPos={xPos}
          id={rowNum + "-" + (this.state[rowNum].length + 1)}
        />,
      ]),
    });
    //if no coordinates are given
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function (i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;

    const layout = [
      { i: "a", x: 0, y: 0, w: 1, h: 2 },
      { i: "b", x: 3, y: 1, w: 3, h: 2 },
      { i: "c", x: 5, y: 2, w: 1, h: 2 },
      { i: "d", x: 5, y: 2, w: 1, h: 2 },
      { i: "e", x: 5, y: 2, w: 1, h: 2 },
    ];

    return (
      <div className="arrangement-container">
        <h3>Rewards Arrangement</h3>
        
{/* 
        <p draggable="true" ondragstart="event.dataTransfer.setData('text/plain', 'This text may be dragged')">
          This text <strong>may</strong> be dragged.
        </p>
        
        <div className='dropzone' ondragover="event.preventDefault()"> */}




          
          {/* <div className="board">
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
          </div> */}

          <ResponsiveGridLayout
            className="layout"
            {...this.props}
            layouts={layout}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={this.onLayoutChange}
            // WidthProvider option
            measureBeforeMount={true}
            // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
            // and set `measureBeforeMount={true}`.
            useCSSTransforms={true}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          >
            <div key="1">1</div>
            <div key="2">2</div>
            <div key="3">3</div>
            <div key="4">4</div>
            <div key="5">5</div>
            {this.generateDOM()}
          </ResponsiveGridLayout>
        {/* </div> */}
        // <button>Save Arrangement</button>
        //{" "}
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
