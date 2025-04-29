export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    user: [{
      id: null,
      name: null,
      email: null,
      password: null
    }],
    token: null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'add_user':
      const { name, email, password } = action.payload

      return {
        ...store,
        user: store.user.map((user) => (user.id === id ? { ...user, name: name, email: email, password: password } : user))
      };

    case 'set_token':
      return {
        ...store,
        token: action.payload
      };
    default:
      throw Error('Unknown action.');
  }    
}
