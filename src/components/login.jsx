import React, { Component } from 'react';
import { auth, User } from '../fsociety';

// import store from '../store.js';
import { login } from '../actions.js';
import { connect } from 'react-redux';

class Login extends Component{
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: '',
        logged_in: false
      }
    }

  }

  login (props) {
    var user;
    auth()
      .then( (user) => {
        console.log('this', this)
        console.log(user);
        this.setState({user:
          {
          id: User.user.uid,
          logged_in: true
          }
        });
        //store.dispatch(storeData({user: this.state.user}))
        this.props.login(User.user.uid);
      })
      .catch(function (e) {
        console.log(e);
      });
      console.log(user)
      this.props.history.push("/news")
  }

  render(){
    return(
      <div>
        <button className='login' onClick={()=> this.login()}>Login With Google</button>
      </div>
    );
  }
}

function mapProps (state) {
  return {};
}

function mapDispatch (dispatch) {
  return {
    login: function (id) {
      dispatch(login(id));
    }
  }
}

var ConnectedLogin = connect(mapProps, mapDispatch)(Login);
export default ConnectedLogin;
