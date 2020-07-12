// List all arrangements - name, view, edit
import React from 'react'
import { Link, Redirect, withRouter } from "react-router-dom";


class Home extends React.Component {
    render() {
        return (
            <div>
                <h3>Saved Arrangements</h3>


                <Link to={'/create'}>Create New Arrangement</Link>
            </div>
        )
    }
}


export default Home;
