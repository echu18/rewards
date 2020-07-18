// List all arrangements - name, view, edit
import React from 'react'
import { Link, Redirect, withRouter } from "react-router-dom";


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arrangements: this.props.arrangements,
            fetched: false
        }
    }
    
    componentDidMount(){
        this.props.fetchArrangements();
    }

    componentDidUpdate(prevProps){
        if (this.props.arrangements !== prevProps.arrangements){
            this.setState({arrangements: this.props.arrangements})
        }
    }


    render() {
        // if (!this.props.arrangements) return null;

        // let arrangements = Object.values(this.props.arrangements); 
        let fetched =  this.state.fetched;
        
        function fetchedArrangements(arrangements){
            // if (!!fetched) return;
            arrangements = Object.values(arrangements)

            if (arrangements.length === 0) {
                return <p>No saved arrangements.</p>
            } else {
                {arrangements.map((arrangement, i) => {
                    return <h5 key={i}>{arrangement.name}</h5>
                })}
            }
        } 

        debugger
        return (
            <div>
                <h3>Saved Arrangements</h3>
                <div>
                    {/* {fetchedArrangements(this.state.arrangements)} */}
                    {Object.values(this.state.arrangements).map((arrangement, i) => {
                        return <h5 key={i}>{arrangement.name}</h5>
                    })}
                </div>
                

                <Link to={'/create'}>Create New Arrangement</Link>
            </div>
        )
    }
}


export default Home;
