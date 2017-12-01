import { combineReducers } from 'redux';

// var initialState = {
//   content: [],
//   user: {
//     id: '',
//     logged_in: false
//   }
// };

function user (state = {id: '', logged_in: false}, action) {
  switch (action.type) {
    case 'LOGIN':
      var new_state = {...state};
      new_state.id = action.id;
      new_state.logged_in = true;
      return new_state;

    default:
      return state;
  }
}

function content (state = [], action) {
  switch (action.type) {
    case 'STORE_DATA':
      // 1. Copy the sate
      // let new_state = Object.assign({}, state, {contacts: []});
      // state.contacts.forEach((old, index) => {
      //   let new_contact = Object.assign({}, old);
      //   new_state.contacts.push(new_contact);
      // });

      var new_state = [...state];

      // 2. Modify new state
      new_state.push(action.data);
      console.log('new_state_reducers', new_state)
      // 3. return new state
      return new_state;

    default:
      return state;
  }

}


const hacker_news = combineReducers({
  user,
  content
});

export default hacker_news;
