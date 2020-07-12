// List all arrangements - name, view, edit
import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import Draggable, {DraggableCore} from 'react-draggable';


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

    return (
      <div>
        <h3>Reward Arrangement</h3>

        <Draggable grid={[200, 200]} axis="x" {...dragHandlers}>
          <div className="box">I snap to a 200 x 200 grid</div>
        </Draggable>

        <button>Save Arrangement</button>
      </div>
    );
  }
}

export default Arrangement;
