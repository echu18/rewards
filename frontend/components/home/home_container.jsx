
import { connect } from "react-redux";
import Home from "./home";

import { addArrangement, fetchAllArrangements, fetchArrangement, modifyArrangement, destroyArrangement, clearErrors } from '../../actions/arrangement_actions';

const mapStateToProps = (state, ownProps) => ({
  arrangements: state.arrangements,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  fetchArrangement: (arrangementId) => dispatch(fetchArrangement(arrangementId)),
  fetchArrangements: () => dispatch(fetchAllArrangements()),
  addArrangement: (arrangement) => dispatch(addArrangement(arrangement)),
  modifyArrangement: (arrangementId) => dispatch(modifyArrangement(arrangementId)),
  destroyArrangement: (arrangementId) => dispatch(destroyArrangement(arrangementId)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
