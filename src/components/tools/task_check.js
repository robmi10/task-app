import React, {Component} from "react";
import {Grid, AppBar, Toolbar, InputBase, 
    IconButton, Button, TextField, Dialog, DialogTitle, Typography} from '@material-ui/core';
import {render} from "react-dom";
import Checkbox from '@material-ui/core/Checkbox';

export default class Task_check extends Component{
    constructor(props){
            super(props);
            this.state ={
                completed: true
            }
    }
    
    handle_check_state = () =>{
        console.log("STATUS",this.state.completed)

        if(this.state.completed){
            this.setState({
                completed: false
            })
            console.log("inside 1 ",this.state.completed)
        }
        else{
            this.setState({
                completed: true
            })
            console.log("inside 2",this.state.completed)
       }
       console.log("STATUS 2",this.state.completed)
        
    }

    handle_update_check = () =>{
        var url = "http://127.0.0.1:8000/api/task-update"

        fetch(url, {
            method: 'PUT',
            headers:{
                'Content-type':'application/json',
            },
            body:
            JSON.stringify({
                'id':  this.props.id,
                'completed': this.state.completed
            })
        }).then((response)=>{
            console.log("response->", response)
        }).catch((error)=>{
            console.log("error", error)
        })
    }

    check_box = () =>{
        if(this.props.user == this.props.author.toLowerCase()){
            return(
                <Checkbox
                    
            onChange ={()=>{
                this.handle_check_state()
                this.handle_update_check()  
            }}
            />
            )
        }
        else if (this.props.user != this.props.responsibility){
            return(
                <Checkbox
                disabled = {true}
                onChange ={()=>{
                this.handle_check_state()
                this.handle_update_check()  
            }}
            />
            )
        }
        else{
            return(
            <Checkbox
                    
            onChange ={()=>{
                this.handle_check_state()
                this.handle_update_check()  
            }}
            />
            )
        }
    }

    render(){
        return(
             this.check_box()
            
        )
    }
}