import React, {Component} from "react";
import {withStyles } from '@material-ui/core/styles';
import {Grid, AppBar, Toolbar, InputBase, 
    IconButton, Button, TextField, Dialog, DialogTitle, Typography, Container} from '@material-ui/core';
import {render} from "react-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import {db, auth} from '../firestore'

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
      height: 400,
      padding: 20,
      marginTop: 10,
      width: 300,
      position: 'relative',
               left: 1060,
               top: 80,
  },
});

class Login extends Component{
    constructor(props){
            super(props);
            this.state ={
                username: '',
                password: '',
                user_list: []
            }
    }

    componentDidMount(){
        console.log("doc --->", this.props.doc)
        this.get_firestor_user()
    }

    handle_username = (e)=>{
        this.setState({
            username: e.target.value
        })
    }

    handle_password = (e) =>{
        this.setState({
            password: e.target.value
        })
    }


    get_firestor_user =() =>{
        db.collection('user').get().then(snapshot => {
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
                user_list: item_list
            })
            console.log("All task_data", this.state.user_list)
        }).catch(error=> console.log(error))
    }

    handle_login = () =>{
        for (let i = 0; i <  this.state.user_list.length; i++) {
                console.log("username", this.state.user_list[i].username)
                if(this.state.user_list[i].username == this.state.username && this.state.user_list[i].password == this.state.password){
                    console.log("You are Logged in")

                    console.log("this.state.username", this.state.username)
                    this.props.history.push(`/task`, {user: this.state.username, id: this.state.user_list[i].id
                    });
                    
                }else{
                     console.log("Wrong password or username")
                }
          }
    }

    test_login = () =>{  
            var url = "http://127.0.0.1:8000/api/login-user"
    
            fetch(url, {
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:
                JSON.stringify({
                    'id': Math.floor(Math.random() * 100) + 1,
                    'username':  this.state.username,
                    'password': this.state.password,
                })
            }).then((response)=>{
                console.log("response->", response)
            }).catch((error)=>{
                console.log("error", error)
            })
    }

    render(){
        const { classes } = this.props;
        return(

            <div className={classes.paper}>
                <Container component="main" maxWidth="xs">
                
                <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar>   
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth  
                    label="Username"
                    autoFocus
                    onChange = {this.handle_username}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type = 'password'
                    label="Password"
                    autoComplete="current-password"
                    onChange = {this.handle_password}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick ={()=>{
                        this.handle_login()
                    }}
                    
                >Login
                
                </Button>

                <Grid container>
                    <Grid item>
                    <Link href="/register" variant="body2">
                        {"Register"}
                    </Link>
                    </Grid>
                </Grid>
                
                </Container>
                </div>

          
        )
    }
}

export default withStyles(styles) (Login);