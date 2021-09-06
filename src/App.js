import React, {Component} from "react";
import Task from "./components/Task"
import TaskItem from "./components/TaskItem";
import './App.scss'
import Home from "./home";
import Navbar from "./navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import {BrowserRouter as  Switch, Route} from 'react-router-dom';

export default class App extends Component{
    constructor(props){
            super(props);
            this.state={
                user: ''
            }
    }


    handle_inputvalue = (user) =>{

        console.log("INSIDE NAV USER->", user)
        this.setState({
            user: user
        })

        localStorage.setItem('username', user)
    }


    render(){
        return(
        <div className="App">
        <Switch>
            <Navbar user = {this.state.user}/>
            <Route exact path = "/" component = {Home}/> 

            <Route path="/task" render={props => <Task handle_inputvalue = {this.handle_inputvalue.bind(this)} />} />

            <Route exact path = "/task-item" component = {TaskItem}/> 
            <Route exact path = "/register" component = {Register}/> 
            <Route exact path = "/login" component = {Login}/> 

        </Switch>
        </div>
        )
    }
}
