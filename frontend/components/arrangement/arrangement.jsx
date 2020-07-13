// List all arrangements - name, view, edit
import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import Draggable, {DraggableCore} from 'react-draggable';
// import GridLayout from "react-grid-layout";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";



class Arrangement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

//   handleDrag = (e, ui) => {
//     const { x, y } = this.state.deltaPosition;
//     this.setState({
//       deltaPosition: {
//         x: x + ui.deltaX,
//         y: y + ui.deltaY,
//       },
//     });
//   };

//   onStart = () => {
//     this.setState({ activeDrags: ++this.state.activeDrags });
//   };

//   onStop = () => {
//     this.setState({ activeDrags: --this.state.activeDrags });
//   };

//   // For controlled component
//   adjustXPos = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const { x, y } = this.state.controlledPosition;
//     this.setState({ controlledPosition: { x: x - 10, y } });
//   };

//   adjustYPos = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const { controlledPosition } = this.state;
//     const { x, y } = controlledPosition;
//     this.setState({ controlledPosition: { x, y: y - 10 } });
//   };

//   onControlledDrag = (e, position) => {
//     const { x, y } = position;
//     this.setState({ controlledPosition: { x, y } });
//   };

//   onControlledDragStop = (e, position) => {
//     this.onControlledDrag(e, position);
//     this.onStop();
//   };

  render() {
       const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
       const { deltaPosition, controlledPosition } = this.state;


        const layout = [
          { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
          { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
          { i: "c", x: 4, y: 0, w: 1, h: 2 },
        ];

    return (
      <div>
        <h3>Reward Arrangement</h3>

        {/* <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
            <div key="a">a</div>
            <div key="b">b</div>
            <div key="c">c</div>
        </GridLayout> */}

        <div className="board">
          <div className="rewards">
            <h3>Rewards</h3>

            <div>R1</div>
            <div>R2</div>
            <div>R3</div>
            <div>R4</div>
            <div>R5</div>
          </div>

          <div className="categories">
            <h3>Categories</h3>
            <div className='cat-header'>
                <div>C1</div>
                <div>C2</div>
                <div>C3</div>
                <div>C4</div>
                <div>C5</div>
            </div>

            <div className="row-1">
              <Draggable id='draggable' grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 1 <span>x</span></div>
              </Draggable>
              <Draggable grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 1</div>
              </Draggable>
            </div>

            <div className="row-2">
              <Draggable grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 2</div>
              </Draggable>
              <Draggable grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 2</div>
              </Draggable>
            </div>

            <div className="row-3">
              <Draggable grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 3</div>
              </Draggable>
              <Draggable grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 3</div>
              </Draggable>
            </div>

            <div className="row-4">
              <Draggable grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 4</div>
              </Draggable>
              <Draggable grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 4</div>
              </Draggable>
            </div>

            <div className="row-5">
              <Draggable grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 5</div>
              </Draggable>
              <Draggable grid={[100, 100]} axis="x" {...dragHandlers}>
                <div className="box">Reward 5</div>
              </Draggable>
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
