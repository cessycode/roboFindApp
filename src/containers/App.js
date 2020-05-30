import React, {Component} from 'react';
import {connect} from 'react-redux';
import Searchbox from '../components/Searchbox';
import Card from '../components/Card';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './app.css';

import {setSearchField, requestRobots} from '../actions';

// Creating mapStateToProps and mapDispatchToProps functions for connect() 
//-- see export default connect(mapStateToProps, mapDispatchToProps)(App) at the bottom of page

// THIS IS THE STATE
const mapStateToProps = state => { 
                // state refers to the value passed from index.js
                // as per code line: 
                //                <Provider store={store}>  
                //                      <App />
                //                </Provider>
                // where store is from reducers.js
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
        // will be accessed as this.props.searchField 
    }
}

// THIS IS THE ACTION
const mapDispatchToProps = dispatch => { 
            // dispatch is passed on and automatically provided by <Provider>
            // dispatch triggers the action
    return {        
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)), //from actions.js
             // object will be accessed as this.props.onSearchChange
        
        onRequestRobots: () => dispatch(requestRobots())
            // this will return a function to be executed with redux-thunk
            // this object will be accessed as this.props.onRequestRobots();
    }
}


class App extends Component {
    // read: Lifecycle Hooks
    componentDidMount() {
        this.props.onRequestRobots(); // from mapDispatchToProps
    }

    render () {
        //Note: DESTRUCTURING used in declaring variables 
        const {searchField, onSearchChange, robots, isPending} = this.props;
            // from mapStateToProps
            // same as: 
            // const searchField = this.props.searchField
            // const onSearchChange = this.props.onSearchChange
            //const robots = this.state.robots
        
        const filteredRobots = robots.filter(robot => {
            return (
                robot.name.toLowerCase().includes(searchField.toLowerCase())
            )
        })
        return (
            isPending ? <h1>Loading...</h1> :
            (
                <div className = 'tc'>
                    <h1>FindRoboApp</h1>
                    <Searchbox searchChange = {onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <Card robots = {filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            )
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
                // connect() - connects the reducers and actions to the App
                // mapStateToProps - subscribe to any state changes in redux store (reducers.js)
                // mapDispatchToProps - listens to any props that are actions (actions.js)
