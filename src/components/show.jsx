import React from 'react';
import Core from '../core/index';
import '../css/App.css';

import {Link} from 'react-router-dom';


class Show extends Core{
  constructor(props){
    super(props);

    this.state = {
      show: [],
    }

    var api_url = 'https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty';
    this.story_getter('show', api_url);
  }

  mapper(top_stories) {
    var comment_or_discuss;
    let comments;

    let map = Object.keys(top_stories).map((key)=> {

      let id = top_stories[key].id;
      if(top_stories[key].kids <= 0){
        comment_or_discuss = 'discuss';
      } else {
        comments = top_stories[key].kids;
        comment_or_discuss = `${comments} comments`;
      }

      return (
        <li key={key} details={top_stories[key]}><button id='arrow'></button>
          <span ><Link target="_blank" to={top_stories[key].url}>{top_stories[key].title}</Link></span>
          <br />
          <p id='not_mobile_content'>
            {top_stories[key].score} points {top_stories[key].by} {top_stories[key].time}
            <button>hide</button>|<button>past</button>|<button>web</button>|<button><Link id={id} to={'/comments/' +id}>{comment_or_discuss}</Link></button>
          </p>
        </li>
      )
    });

    return map;

  }

  render(){
    return(
      <div className='comment_div'>
        <h3 className='show_h3' id='not_mobile_content'>Please read the <u>rules</u>. You can also browse the <u>newest</u> Show HNs.</h3>
        <ol className='jobs_list'>{this.mapper(this.state.show.slice(0, 30))}</ol>
        {/* <h2>More</h2> */}
      </div>
    );
  }
}


export default Show;
