import React from 'react';
import Core from '../core/index'

import {Link} from 'react-router-dom';


class New extends Core{
  constructor(props){
    super(props);

    this.state = {
      new_stories: [],
    }

    var api_url = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';
    this.story_getter('new_stories', api_url);
  }

  mapper(temp_array) {
    var comment_or_discuss;
    let comments;

    let sorted = temp_array.sort(function(s1, s2){
      if(s1.time > s2.time){
          return 1;
        } else {
          return -1;
        }
      });
      // setTimeout(()=>{
      //   console.log('sort it out', sorted)
      // },2000);

    let map = Object.keys(sorted).map((key)=> {
      // console.log('sort it out', sorted)

      let id = sorted[key].id;
      if(sorted[key].kids.length === 0){
        comment_or_discuss = 'discuss';
      } else {
        comments = sorted[key].kids;
        comment_or_discuss = `${comments} comments`;
      }

      return (
        <li key={key} details={sorted[key]}><button id='arrow'></button>
          <span><Link target="_blank" to={sorted[key].url}>{sorted[key].title}</Link></span>
          <br />
          <p id='not_mobile_content'>
            {sorted[key].score} points {sorted[key].by} {sorted[key].time}
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
        <ol>{this.mapper(this.state.new_stories.slice(0, 30))}</ol>
        {/* <h2>More</h2> */}
      </div>
    );
  }
}


export default New;
