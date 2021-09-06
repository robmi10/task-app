import React, {Component} from "react";
import {withStyles } from '@material-ui/core/styles';
import {Grid, AppBar, Toolbar, InputBase, 
    IconButton, Button, TextField, Dialog, DialogTitle, Typography, Container} from '@material-ui/core';
import {render} from "react-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

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

class Register extends Component{
    constructor(props){
            super(props);
            this.state ={
                username: '',
                password: ''
            }
    }

    componentDidMount(){
        
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

    handleempty_state = () =>{
        this.setState({
            username: '',
            password: ''
        })
    }

    handle_submit = () =>{
        var url = "http://127.0.0.1:8000/api/create-user"

        fetch(url, {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:
            JSON.stringify({
                'id': Math.floor(Math.random() * 100) + 1,
                'username': this.state.username,
                'password': this.state.password,
                'loggedin': true
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

                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type = 'password'
                    label="Repeat Password"
                    autoComplete="current-password"
                    onChange = {this.handle_password}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick ={()=>{
                        this.handle_submit()
                    }}
                    
                >Register
                
                </Button>

                <Grid container>
                    <Grid item>
                    <Link href="/login" variant="body2">
                        {"Sign in"}
                    </Link>
                    </Grid>
                </Grid>
                
                </Container>
                </div>

          
        )
    }
}

export default withStyles(styles) (Register);