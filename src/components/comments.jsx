import React from 'react';
import Core from '../core/index';

import '../css/comments.css';

import axios from 'axios'

import database, {User} from '../fsociety';

import { connect } from 'react-redux';


class Comments extends Core{
  constructor(props){
    super(props);

    this.comment_getter();

    this.db_check()

    this.state = {
      comments: [],
      // added_comments: [],
      mapHTML: [],
      article: {},
      // comment_tree: {
      //   parent: '',
      //   siblings: []
      // }
    }
  }

  db_check(){
    setTimeout(()=>{
      let pathname = this.props.history.location.pathname;
      let id = Number(pathname.split('').splice(10).join(''));
      console.log('pathname and id are here', pathname, id);

      database.ref('comments/' + User.user.uid + '/' +id)
        .once('value')
        .then((comments)=> {
          let new_array = this.state.mapHTML;
          for (var key in comments.val()) {
            // console.log(comments.val()[key])
            // new_comment_list.push(comments.val()[key]);
            new_array.push(
              <li>
                <button id='arrow'></button><p className='gray2'>{comments.val()[key][0]}</p>
                <br/>
                <p className='indent'>{comments.val()[key][1]}</p>
              </li>
            )
          }
          console.log(new_array);
          this.setState({mapHTML: new_array});
        })
    }, 1500);
  }

  comment_getter(){
    let pathname = this.props.history.location.pathname;
    let id = Number(pathname.split('').splice(10).join(''));
    // let story_comments;
    let promises = [];
    let api_responses = [];
    let api_url;

    api_url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`

    axios.get(api_url)
      .then( (response) => {

        let post_time = new Date(response.data.time * 1000)
        let now = new Date(Date.now());
        let dif = now - post_time
        let humanTime = this.human_time(dif / 1000)
        // console.log(humanTime)

        let the_article = {
          by: response.data.by,
          descendants: response.data.descendants,
          id: response.data.id,
          kids: response.data.kids || 0,
          score: response.data.score,
          time: humanTime,
          title: response.data.title,
          // type: response.data.type,
          url: response.data.url || 'https://news.ycombinator.com/item?id=' + response.data.id
        }

        this.setState({article: the_article})
        if(response.data.kids){
        response.data.kids.forEach((id)=>{
          // console.log(id);
          api_url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          promises.push(axios.get(api_url));
          // console.log('promises', promises)
        });
      Promise.all(promises)
        .then( (responses)=>{
          responses.forEach((response)=> {
            api_responses.push(response.data);
          })
          this.setState({comments: api_responses});
          this.mapper();
        })
      }
      })
    }

  handle_submit(event) {
    let pathname = this.props.history.location.pathname;
    let id = Number(pathname.split('').splice(10).join(''));

    let new_comment = [User.user.displayName, this.comment.value];
    let new_comment_list = this.state.mapHTML
    new_comment_list.push(<li><button id='arrow'></button><p className='gray2'>{new_comment[0]}</p>
                            <br/><br/>
                            <p className='indent_more'>{new_comment[1]}</p>
                          </li>
                        );
    event.preventDefault();

    this.setState({mapHTML: new_comment_list});
    // save to firebase
    database.ref('comments/' + User.user.uid + '/' +id).push(new_comment);

    this.comment.value = '';
  }

  mapper() {
    let api_responses = this.state.comments
    let map = Object.keys(api_responses).map((key)=> {
      let id = api_responses[key];
      // console.log('ID', id);
      // console.log('comment kids', api_responses[key].kids);
      let post_time = new Date(id.time * 1000)
      let now = new Date(Date.now());
      // let utc = now.getUTCSeconds();
      let dif = now - post_time
      // console.log('UTC', post_time)
      // let humanTime = 1;
      let humanTime = this.human_time(dif / 1000)
      // console.log(humanTime)


  // this is to create the comment trees, I didn't have time to add it in.
      // let promises = []
      // let api_responses2 = []
      //
      // let comment_tree = []
      // comment_tree.push(api_responses[key].kids);
      //
      // comment_tree.forEach((id)=>{
      //   let api_url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      //   promises.push(axios.get(api_url));
      // });
      // Promise.all(promises)
      //   .then( (responses)=>{
      //     responses.forEach((response)=> {
      //       // console.log(response.data)
      //       console.log('from api', response.data);
      //       api_responses2.push(response.data);
      //       console.log('kids', api_responses2)
      //       this.setState({
      //       })
      //     });
      //   });

    if(id.kids === 0) {
      return (
          <li className='comments' key={key} details={id}><button id='arrow'></button>{id.by} {humanTime} <br/> <div dangerouslySetInnerHTML={{__html: id.text}}/></li>

        );
    } else {
      return (
          <li className='comments' key={key} details={id}><button id='arrow'></button>{id.by} {humanTime} <br/> <div dangerouslySetInnerHTML={{__html: id.text}}/>
            <ul>{/*this is where I can add in the comment-tree*/}</ul>
          </li>
        );
      }
    })
    this.setState({mapHTML: map});
  }

  render(){
    if (!this.props.user.logged_in) {
      return (
        <div>Please Login</div>
      )
    }
    let comments;
    if(this.state.article.kids > 0) {
      comments = `${this.state.article.kids} comments`;
    } else {
      comments = 'discuss';
    }
// {'/comments/' +id}
// {this.state.article.url}
console.log('checkout current state here', this.state.article, typeof this.state.article.url);
    return(

      <div className='comment_div'>
        <form onSubmit={event => this.handle_submit(event)}>
          <h1 className='comments_h1'><button id='arrow'></button><a href={this.state.article.url}>{this.state.article.title}</a></h1>
          <p className='gray' id='not_mobile_content'>
            {this.state.article.score} points {this.state.article.by} {this.state.article.time} |<button>hide</button>
            |<button>past</button>|<button>web</button>|<button>{comments}</button>
          </p>
          <textarea ref={(input) => this.comment = input}></textarea>
          <br/>
          <button className='submit_buttom'>add comment</button>
        </form>
        <div>
          <ul>{this.state.mapHTML}</ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    // content: state.content
  };
}

var ConnectedComments = connect(mapStateToProps)(Comments);

export default ConnectedComments;
