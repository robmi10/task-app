import React, {Component} from "react";
import {Grid, AppBar, Toolbar, InputBase, 
    IconButton, Button, TextField, Dialog, DialogTitle, Typography} from '@material-ui/core';
import {render} from "react-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

export default class Task_delete extends Component{
    constructor(props){
            super(props);
            this.state ={
                completed: true
            }
    }

    sendtoparents_from_delete = () =>{
        this.props.delete_list_item(this.props.id);
      }

    handle_delete_check = () =>{
        var url = "http://127.0.0.1:8000/api/task-delete"
        fetch(url, {
            method: 'DELETE',
            headers:{
                'Content-type':'application/json',
            },
            body:
            JSON.stringify({
                'id':  this.props.id,
            })
        }).then((response)=>{
            console.log("response->", response)
        }).catch((error)=>{
            console.log("error", error)
        })
    }


    handle_delete = () =>{
        if(this.props.user == this.props.author.toLowerCase()){
            return(
                <Button color="secondary"
                onClick={()=>{
                    this.handle_delete_check()
                    this.sendtoparents_from_delete()
                }}
                >
                <DeleteIcon
                />
                </Button>
            )
        }else if (this.props.user != this.props.responsibility){
            return(
            <Button color="secondary"
            disabled = {true}
            onClick={()=>{
                this.handle_delete_check()
                this.sendtoparents_from_delete()
            }}
            >
            <DeleteIcon
            />
            </Button>
            )
        }
        else{
            return(
            <Button color="secondary"
                onClick={()=>{
                    this.handle_delete_check()
                    this.sendtoparents_from_delete()
                }}
                >
                <DeleteIcon
                />
                </Button>)
        }
    }
    

    render(){
        return(
            this.handle_delete()
        )
    }
}