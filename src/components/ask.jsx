import React from 'react';
import Core from '../core/index'

import {Link} from 'react-router-dom';

class Ask extends Core{
  constructor(props){
    super(props);

    this.state = {
      ask: [],
    }

    var api_url = 'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty';
    this.story_getter('ask', api_url);
  }

  mapper(top_stories) {
    var comment_or_discuss;
    let comments;

    let ask = top_stories;

    // console.log('mapper time', ask)
    let map = Object.keys(ask).map((key)=> {

      let content = ask[key];
      for (key in content) {
        // console.log(content, content.by, content.title)
        // new_comment_list.push(comments.val()[key]);

      if(content.kids <= 0){
        comment_or_discuss = 'discuss';
      } else {
        comments = content.kids;
        comment_or_discuss = `${comments} comments`;
      }

      return (
        <li key={key}><button id='arrow'></button>
          <span><Link to='/'>{content.title}</Link></span>
          <br />
          <p id='not_mobile_content'>
            {content.score} points {content.by} {content.time}
            <button>hide</button>|<button>past</button>|<button>web</button>|<button><Link id={content.id} to={'/comments/' + content.id}>{comment_or_discuss}</Link></button>
           </p>
       </li>
       )
     }

    });
    return map;
  }

  render(){
    return(
      <div>
        <ol>{this.mapper(this.state.ask.slice(0, 30))}</ol>
        {/* <h2>More</h2> */}
      </div>
    );
  }
}


export default Ask;
