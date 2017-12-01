import { Component } from 'react';

import axios from 'axios'
import human from 'human-time'


class Core extends Component {
  human_time (ts) {
    return human(ts);
  }
  story_getter(state_param, api_url){
    var config = {
      params: {
      }
    };

    var api_response = [];

    axios.get(api_url, config)
      .then( (response) => {
        // console.log(response.data);
        api_response = response.data.slice(0, 30);
        var promises = [];
        api_response.forEach((id)=> {
          // console.log('for each', id)
          api_url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          promises.push(axios.get(api_url, config));
        });

        Promise.all(promises)
          .then( (responses)=>{
            let temp_array = this.state[state_param];
            // console.log(response.data);
            responses.forEach((response)=> {
              let post_time = new Date(response.data.time * 1000)
              let now = new Date(Date.now());
              // let utc = now.getUTCSeconds();
              let dif = now - post_time
              // console.log('UTC', post_time)
              // let humanTime = 1;
              let humanTime = this.human_time(dif / 1000)
              // console.log(response.data);
              var kids;

              if(response.data.kids){
                kids = response.data.kids.length || 0;
              } else {
                kids = ''
              }

              let data = {
                by: response.data.by,
                descendants: response.data.descendants,
                id: response.data.id,
                kids: kids,
                score: response.data.score,
                time: humanTime,
                title: response.data.title,
                // type: response.data.type,
                url: response.data.url || 'https://news.ycombinator.com/item?id=' + response.data.id
              };
              temp_array.push(data);
            });

            this.mapper(temp_array.slice(0, 30));
            this.setState({
              [state_param]: temp_array
            });
          });
      })
      .catch(function (error) {
        console.error(error);
      });

  }

}

export default Core;
