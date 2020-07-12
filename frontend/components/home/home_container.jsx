// import React from "react";
import { connect } from "react-redux";

import Home from "./home";

const mapStateToProps = (state, ownProps) => ({
//   currentUser: state.entities.users[state.session.currentUserId],
  // users: state.entities.users
});

const mapDispatchToProps = (dispatch) => ({


// need function to get all saved arrangements
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
