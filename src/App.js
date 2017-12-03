import React, { Component } from 'react';
import './css/App.css';

import Ask from './components/ask'
import NewComments from './components/newcomments'
import Comments from './components/comments'
import Jobs from './components/jobs'
import News from './components/news'
import New from './components/new'
import Show from './components/show'
import Submit from './components/submit'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

import {BrowserRouter, Route, Link, Switch}
  from 'react-router-dom';

import { auth, User } from './fsociety';

import { Provider } from 'react-redux';
import store from './store.js';
import { login } from './actions.js';
import { connect } from 'react-redux';

const theme = getMuiTheme({
  palette: {
    primary1Color: '#ff6500',
    accent1Color: '#000000',

    textColor: '#000000',
  },
  appBar: {
    height: 30,
    textColor: '#000000',
  },
  IconButton: {
    height: 50,
    background: 'logo.svg',
  },
});

class App extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      user: {
        id: '',
        user_name: '',
        logged_in: false
      },
      current_page: ''
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
          user_name: User.user.displayName,
          logged_in: true
          }
        });
        this.props.login(User.user.uid);
      })
      .catch(function (e) {
        console.log(e);
      });
      console.log(user)
  }

  page_setter(page){
    let current_page = this.state.current_page;
    console.log('page set', page)
    this.setState({current_page: page});
  }

  iconStyle = {
    background: "transparent url('logo.svg') no-repeat",
    backgroundSize: "contain"
  }

  render() {
    let login_or_user;
    if(this.state.user.logged_in){
      login_or_user = <button className='login_alt' onClick={()=>{this.login()}}>{this.state.user.user_name}</button>;
    } else {
      login_or_user = <button className='login' onClick={()=>{this.login()}}>login</button>;
    }

    let new_stories;
    let new_comments;
    let show;
    let ask;
    let jobs;
    let submit;

    if(this.state.current_page === '/new'){
      new_stories = <Link className='navitem white_select' to='/new' onClick={()=> this.page_setter('/new')}>new</Link>;
    } else {
      new_stories = <Link className='navitem' to='/new' onClick={()=> this.page_setter('/new')}>new</Link>;
    }
    if(this.state.current_page === '/newcomments'){
      new_comments = <Link className='navitem white_select' to='/newcomments' onClick={()=> this.page_setter('/newcomments')}>comments</Link>;
    } else {
      new_comments = <Link className='navitem' to='/newcomments' onClick={()=> this.page_setter('/newcomments')}>comments</Link>;
    }
    if(this.state.current_page === '/show'){
      show = <Link className='navitem white_select' to='/show' onClick={()=> this.page_setter('/show')}>show</Link>;
    } else {
      show = <Link className='navitem' to='/show' onClick={()=> this.page_setter('/show')}>show</Link>;
    }
    if(this.state.current_page === '/ask'){
      ask = <Link className='navitem white_select' to='/ask' onClick={()=> this.page_setter('/ask')}>ask</Link>;
    } else {
      ask = <Link className='navitem' to='/ask' onClick={()=> this.page_setter('/ask')}>ask</Link>;
    }
    if(this.state.current_page === '/jobs'){
      jobs = <Link className='navitem white_select' to='/jobs' onClick={()=> this.page_setter('/jobs')}>jobs</Link>
    } else {
      jobs = <Link className='navitem' to='/jobs' onClick={()=> this.page_setter('/jobs')}>jobs</Link>;
    }
    if(this.state.current_page === '/submit'){
      submit = <Link className='navitem white_select' to='/submit' onClick={()=> this.page_setter('/submit')}>submit</Link>
    } else {
      submit = <Link className='navitem' to='/submit' onClick={()=> this.page_setter('/submit')}>submit</Link>;
    }
    let dropdown = <Menu><MenuItem>{new_stories}</MenuItem><MenuItem>{new_comments}</MenuItem><MenuItem>{show}</MenuItem><MenuItem>{ask}</MenuItem><MenuItem>{jobs}</MenuItem><MenuItem>{submit}</MenuItem></Menu>;

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={theme}>
          <BrowserRouter>
            <div className='contents'>
              <AppBar iconElementRight={
                <IconMenu iconButtonElement={<IconButton className='orange'><MoreVertIcon /></IconButton>}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                  <MenuItem><Link className='dropdown_link' to='/new'>new</Link></MenuItem>
                  <MenuItem><Link className='dropdown_link' to='/newcomments'>comments</Link></MenuItem>
                  <MenuItem><Link className='dropdown_link' to='/show'>show</Link></MenuItem>
                  <MenuItem><Link className='dropdown_link' to='/ask'>ask</Link></MenuItem>
                  <MenuItem><Link className='dropdown_link' to='/jobs'>jobs</Link></MenuItem>
                  <MenuItem><Link className='dropdown_link' to='/submit'>submit</Link></MenuItem>
                </IconMenu>}
                  title={<div className="navTitle">
                    <Link className='title' to='/' onClick={()=> this.page_setter('/')}>Hacker News</Link>
                    <span className="navSpan">
                    {new_stories}  |
                    {new_comments} |
                    {show}  |
                    {ask} |
                    {jobs} |
                    {submit}
                    {login_or_user}
                  </span>
                  </div>
                  } iconElementLeft={<button id='logo'></button>}>
              </AppBar>
                <Switch>
                  <Route exact path='/' component={News} />
                  <Route path='/ask' component={Ask}/>
                  <Route path='/comments' component={Comments}/>
                  <Route path='/newcomments' component={NewComments}/>
                  <Route path='/jobs' component={Jobs}/>
                  <Route path='/new' component={New}/>
                  <Route path='/show' component={Show}/>
                  <Route path='/submit' component={Submit}/>
                </Switch>
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
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

var ConnectedApp = connect(mapProps, mapDispatch)(App);
export default ConnectedApp;
