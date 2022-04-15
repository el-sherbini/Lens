import {
  START_LOADING,
  STOP_LOADING,
  FETCH_POST,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  ADD_COMMENT,
} from "../constants/actionTypes";

const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map(
          (post) => (post._id === action.payload._id ? action.payload : post)
          // action.payload is the newly updated post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        // filter() is return all elements that pass the test
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // change the post that just received a comment
          if (post._id === action.payload._id) return action.payload;

          // return all other posts
          return post;
        }),
      };

    default:
      return state;
  }
};

export default postsReducer;
