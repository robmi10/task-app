import React, {Component} from "react";

import {withStyles } from '@material-ui/core/styles';
import {db, auth} from '../firestore'
import Taskitem_check from "./tools/taskitem_check";
import Task_delete from "./tools/task_delete";
import Icon from '@material-ui/core/Icon';
import {withRouter} from 'react-router-dom'


import {Grid, Paper,
    IconButton, Button, TextField, Dialog, DialogContent, DialogTitle, Typography, GridListTile} from '@material-ui/core';
import Taskitem_delete from "./tools/taskitem_delete";


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper,
    },
    paper:{
      background: "rgb(253, 253, 253)",
      boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
      borderRadius: 3,
      height: 199,
      padding: 20,
      marginTop: 10,
      width: 300,
      position: 'relative',
               left: 0,
               top: 0,
  },
  box:{
    left: 0,
    top: 0,
},
  button: {
    color: "white",
    background: "#6851ff",
    width: 100,
    borderRadius: 40,
    boxShadow: 0,
    height: 50,
  
    
     },
  
  
    }
  );
class TaskItem extends Component{
    constructor(props){
            super(props);
            this.state = {
                open: false,           
                task : '',
                description: '',
                responsibility: '',
                completed: false,
                task_data: [],
                id_document: [],
                user_list: []
                

            }

    }

    componentDidMount(){
        console.log("curr id", this.props.location.state.id)
        this.get_firestor_task()
        this.get_firestor_user()
    }
    shouldComponentUpdate(){
        return true
    }

    get_firestor_user =() =>{
        db.collection('user').get().then(snapshot => {
            console.log("snapshot ->", snapshot)
            var item_list = []

            snapshot.forEach(doc =>{
                console.log("documents ->", doc.id)
                console.log("doc ->", doc.data())
                item_list.push(doc.data())
            })

            this.setState({
                user_list: item_list
            })
        }).catch(error=> console.log(error))
    }

    get_firestor_task =() =>{
        db.collection('task').doc(this.props.location.state.id.toString()).collection('taskitem').get().then(snapshot => {
            console.log("snapshot ->", snapshot)
            var item_list = []
            var id_list = []
            var merge_list = []

            snapshot.forEach(doc =>{
                console.log("documents ->", doc.id)
                console.log("doc ->", doc.data())
                item_list.push(doc.data())
            })

            this.setState({
                task_data: item_list
            })

            console.log("All task_data", this.state.task_data)
        }).catch(error=> console.log(error))
    }
    
    handleChange_open = () => {
        this.setState({
            open: true
        })
    }

    handleChange_close = () => {
        this.setState({
            open: false
        })
    }

    handleChange_task = (e) => {
        this.setState({
            task: e.target.value
        })
    }

    handleChange_description = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handleChange_responsibility = (e) => {
        this.setState({
            responsibility: e.target.value
        })
    }

    handleSubmit_item = () =>{
        
        var task = this.state.task
        var description = this.state.description
        var responsibility = this.state.responsibility

        console.log("task---->", task)
        console.log("description---->", description)
        console.log("responsibility---->", responsibility)

        var url = "http://127.0.0.1:8000/api/taskitem"

        fetch(url, {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:
            JSON.stringify({
                'id':  Math.floor(Math.random() * 100) + 1,
                'doc': this.props.location.state.id,
                'author': this.props.location.state.user,
                'title': this.state.task,
                'description': this.state.description,
                'responsibility': this.state.responsibility,
                'completed': false
            })
        }).then((response)=>{
            console.log("response->", response)
        }).catch((error)=>{
            console.log("error", error)
        })

    }

    delete_list_item = (id_) =>{
        console.log("delete id", id_)
        var curr_list = this.state.task_data

        console.log("curr_list", curr_list)

        curr_list.map((option, i)=>{
            if(option.id === id_){
                console.log("curr option -->", option.id)
                delete curr_list[i]
            }
        }) 

        this.setState({
            task_data: curr_list
        })
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>

                <div className={classes.box}>
                    <h1>Task Item</h1>

                    <Button variant="contained" color="primary" onClick ={()=>{
                        this.handleChange_open()
                    }}>
                        Create Task Item
                    </Button>
                    
                    <Dialog open = {this.state.open}>
                        <DialogTitle style={{ cursor: 'cursor'}}>
                        Create Task Item
                        </DialogTitle>
                            <DialogContent>
                            
                            <div>
                                <TextField
                                id="Task"
                                label="Task"
                                onChange = {this.handleChange_task}
                                >
                                </TextField>
                            </div>

                            <div>
                                <TextField
                                multiline
                                id="Description"
                                label="Description"
                                variant="outlined"
                                onChange = {this.handleChange_description}
                                >
                                </TextField>
                            </div>

                            <div>
                                <TextField
                                select
                                id="Responsible"                           
                                helperText="Responsibility"
                                onChange = {this.handleChange_responsibility}
                                SelectProps={{
                                    native: true,
                                }}
                                >
                                {this.state.user_list.map((option, i) => (
                                <option key = {i}>
                                    {option.username}
                                </option>
                            ))}
                               </TextField>
                             
                            </div>

                            <div>
                                <Button variant="contained" color="secondary" onClick ={()=>{
                                        this.handleChange_close()
                                }}>
                                    Cancel
                                </Button>
                                
                                <Button variant="contained" color="primary" onClick ={()=>{
                                        this.handleSubmit_item()
                                        this.handleChange_close()
                                }}>
                                    Submit
                                </Button>
                            </div>
                            </DialogContent>
                    </Dialog>
               
                                {this.state.task_data.map((option, i) => (  
                                                        
                                            <Paper className={classes.paper} key ={option.id}>  
                                                    
                                                <h3>{option.author}</h3> 
                                                <h3>{option.title}</h3>
                                                <h3>{option.description}</h3>
                                                <h3>{option.responsibility}</h3>
                                                <h3>{option.completed}</h3> 
                                                <Taskitem_check id ={option.id} doc = {this.props.location.state.id} author = {option.author} user = {this.props.location.state.user} responsibility = {option.responsibility}/>
                                                <Taskitem_delete id = {option.id} doc = {this.props.location.state.id} author = {option.author} user = {this.props.location.state.user} responsibility = {option.responsibility} delete_list_item = {this.delete_list_item.bind(this)}/>
                                            </Paper>
                                    
                                ))}
                   
                </div>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(TaskItem))