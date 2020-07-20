// List all arrangements - name, view, edit
import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import Draggable, { DraggableCore } from "react-draggable";

class Block extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0,
      }
    };
  }

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };


  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;


    return (
      <Draggable
        bounds="parent"
        grid={[100, 100]}
        axis="x"
        onDrag={this.handleDrag}
        defaultPosition={{x:this.props.xPos, y: 0}}
        {...dragHandlers}
      >
        <div className="box" id={this.props.id}>
          Reward 1 <span>x</span>
          <div>
            x: {deltaPosition.x.toFixed(0)}, y:{" "}
            {deltaPosition.y.toFixed(0)}
          </div>
        </div>
      </Draggable>      
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

export default Block;
