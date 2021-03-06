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
        this.createNew = this.createNew.bind(this)
        this.redirectTo = this.redirectTo.bind(this)
    }
    
    componentDidMount(){
        this.props.fetchArrangements();
    }

    componentDidUpdate(prevProps){
        if (this.props.arrangements !== prevProps.arrangements){
            this.setState({arrangements: this.props.arrangements})
        }
    }

    createNew(){
        this.props.history.push('/create')
    }


    redirectTo(e, url){
        e.preventDefault()
        this.props.history.push(url)
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

        
        return (
            <div className='home-container'>
                <h3>Saved Arrangements</h3>
                <p>Click 'Rewards Map' to return to Home.</p>
                <p>Click or Scroll to view / edit.</p>
                <div className='saved-arrangement-list'>
                    {/* {fetchedArrangements(this.state.arrangements)} */}
                    {Object.values(this.state.arrangements).map((arrangement, i) => {
                        return (<div className='saved-arrangement' onClick={e=> this.redirectTo(e, `/arrangements/${arrangement.id}/edit`)} >
                            <div arrangementId={arrangement.id} key={i}>{arrangement.name}</div>
                        </div>)
                    })}
                </div>
                

                {/* <div className='create-arrangement-btn'><Link to={'/create'}>Create New Arrangement</Link></div> */}
                <div className='create-arrangement-btn' onClick={this.createNew}>Create New Arrangement</div>
            </div>
        )
    }
}


export default Home;
