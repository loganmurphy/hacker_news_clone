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
        //store.dispatch(storeData({user: this.state.user}))
        this.props.login(User.user.uid);
      })
      .catch(function (e) {
        console.log(e);
      });
      console.log(user)
      // this.props.history.push("/news")
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
      login_or_user = <p className='login_alt'>{this.state.user.user_name}</p>;
    } else {
      login_or_user = 'login';
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
      new_comments = <Link className='navitem white_select' id='not_mobile_content' to='/newcomments' onClick={()=> this.page_setter('/newcomments')}>comments</Link>;
    } else {
      new_comments = <Link className='navitem' id='not_mobile_content' to='/newcomments' onClick={()=> this.page_setter('/newcomments')}>comments</Link>;
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
      submit = <Link className='navitem white_select' id='not_mobile_content' to='/submit' onClick={()=> this.page_setter('/submit')}>submit</Link>
    } else {
      submit = <Link className='navitem' id='not_mobile_content' to='/submit' onClick={()=> this.page_setter('/submit')}>submit</Link>;
    }

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={theme}>
          <BrowserRouter>
            <div className='contents'>
              <AppBar className='title' title={<Link className='title' to='/'>Hacker News</Link>} iconElementLeft={<button id='logo'></button>}>
                <Menu  id="menu-appbar">
                  <MenuItem><button className='login' onClick={()=> this.login()}>{login_or_user}</button></MenuItem>
                  <span className='navspan'>
                  {new_stories}  |
                  {new_comments} <p id='not_mobile_content' className='nav_divider'>|</p>
                  {show}  |
                  {ask}  |
                  {jobs} <p id='not_mobile_content' className='nav_divider'>|</p>
                  {submit}
                  </span>
                </Menu>
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

// export default App;
