import React from 'react';
import Core from '../core/index'

import {Link} from 'react-router-dom';


class News extends Core{
  constructor(props){
    super(props);

    this.state = {
      top: [],
    }

    var api_url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
    this.story_getter('top', api_url);
  }

  mapper(top_stories) {
    var comment_or_discuss;
    let comments;

    let news = top_stories;
    // let new_array = []

    let map = Object.keys(news).map((key)=> {
      let id = news[key].id;
      let content = news[key];

      if(content.kids === 0){
        comment_or_discuss = 'discuss';
      } else {
        comments = content.kids;
        comment_or_discuss = `${comments} comments`;
      }

      return (
        <li key={key} details={content[key]}><button id='arrow'></button>
          <span><a href={content.url} target="_blank">{content.title}</a></span>
          <br />
          <p id='not_mobile_content'>
            {content.score} points {content.by} {content.time}
            <button>hide</button>|<button>past</button>|<button>web</button>|<button><Link id={id} to={'/comments/' +id}>{comment_or_discuss}</Link></button>
          </p>
        </li>
      )
    });

    return map;

  }

  render(){
    return(
      <div>
        <ol>{this.mapper(this.state.top.slice(0, 30))}</ol>
        {/* <h2>More</h2> */}
      </div>
    );
  }
}


export default News;
