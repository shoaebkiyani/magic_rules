import {
  GET_DATA,
  SET_LOADING,
  GET_MAIN_HEADING,
  GET_SUBHEADING,
  GET_RULES,
  IS_ACTIVE,
  // SEARCH_RULES,
  GET_INTRO,
} from "../types";

const rulesReducer = (state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        getData: action.payload,
        isLoading: false,
      };
    case GET_INTRO:
      return {
        ...state,
        getIntro: action.payload,
      };
    case GET_MAIN_HEADING:
      return {
        ...state,
        getMainHeadings: action.payload,
        isLoading: false,
        isActive: false,
      };
    case GET_SUBHEADING:
      return {
        ...state,
        getSubHeadings: action.payload,
        isLoading: false,
        isActive: false,
      };
    case GET_RULES:
      return {
        ...state,
        getRules: action.payload,
        isLoading: false,
        isActive: false,
      };
    case IS_ACTIVE:
      return {
        ...state,
        isActive: false,
      };
    case SET_LOADING:
      return {
        //state is immutable so have to make a copy of it to make changes
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default rulesReducer;
