import React from 'react';
import Core from '../core/index'

import {Link} from 'react-router-dom';


class Jobs extends Core{
  constructor(props){
    super(props);

    this.state = {
      jobs: [],
    }
    var api_url = 'https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty';
    this.story_getter('jobs', api_url);
  }

  mapper(jobs) {
    let map = Object.keys(jobs).map((key)=> {

      return (
        <li key={key} details={jobs[key]}>
          <span><Link target="_blank" to={jobs[key].url}>{jobs[key].title}</Link></span>
          <br />
          <p className='smaller' id='not_mobile_content'>
            {jobs[key].time}
          </p>
        </li>
      )
    });

    return map;

  }

  render(){
    return(
      <div className='comment_div'>
        <h3 className='jobs_h3'>These are jobs at startups that were funded by Y Combinator.
          You can also get a job at a YC startup through <a className='triplebyte'>Triplebyte.</a></h3>
        <ul className='jobs_list'>{this.mapper(this.state.jobs.slice(0, 30))}</ul>
        {/* <h2>More</h2> */}
      </div>
    );
  }
}


export default Jobs;
