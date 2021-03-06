// import React from "react";
import { connect } from "react-redux";
import Arrangement from "./arrangement";

import {addArrangement, fetchAllArrangements, fetchArrangement, modifyArrangement, destroyArrangement, clearErrors} from '../../actions/arrangement_actions';

const mapStateToProps = (state, ownProps) => ({
  arrangements: state.arrangements,
  arrangement: state.arrangements[ownProps.match.params.arrangementId],
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  fetchArrangement: (arrangementId) => dispatch(fetchArrangement(arrangementId)),
  fetchArrangements: () => dispatch(fetchAllArrangements()),
  addArrangement: (arrangement) => dispatch(addArrangement(arrangement)),
  modifyArrangement: (arrangementId, arrangement) => dispatch(modifyArrangement(arrangementId, arrangement)),
  destroyArrangement: (arrangementId) => dispatch(destroyArrangement(arrangementId)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Arrangement);
