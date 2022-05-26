// Initila State + Actions (Search or Request for something)

import React, { useReducer, useEffect } from "react";
import url from "../../MagicRules.txt";
import RulesContext from "./rulesContext";
import RulesReducer from "./rulesReducer";
import {
  GET_DATA,
  GET_INTRO,
  SET_LOADING,
  GET_MAIN_HEADING,
  GET_SUBHEADING,
  GET_RULES,
  IS_ACTIVE,
  // SEARCH_RULES,
} from "../types";

// Create Initial State
const RulesState = (props) => {
  var initialState = {
    getData: [],
    getMainHeadings: [],
    getSubHeadings: [],
    getRules: [],
    isLoading: true,
    isActive: false,
  };

  // Dispatch a type to the Reducer
  const [state, dispatch] = useReducer(RulesReducer, initialState);

  // Below are Actions:

  // Fetch Data

  useEffect(() => {
    setTimeout(() => {
      fetching();
      setIsLoading(false);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetching = async (isLoading) => {
    setIsLoading();
    setIsActive();
    const res = await fetch(url);
    const data = await res.text();
    <div>{isLoading && <div>Loading...</div>}</div>;
    let dataSplit = data
      .split(/^\s+|\s*$/gm)
      .filter((element) => isNaN(element));
    dataSplit = dataSplit.slice(0, dataSplit.lastIndexOf("Glossary"));

    dispatch({
      type: GET_DATA,
      payload: dataSplit,
    });

    // Introduction

    const intro = dataSplit
      .slice(0, dataSplit.indexOf("Contents"))
      .join("\n\n");

    dispatch({
      type: GET_INTRO,
      payload: intro,
    });

    // Get Headings

    let mainHeadings = dataSplit.filter(
      (heading) => parseFloat([heading]) < 10
    );
    let subHeadings = dataSplit.filter(
      (subheading) => parseFloat([subheading]) + "." > 10
    );

    // Get Rules

    let rules = dataSplit.filter(
      (rule) => parseFloat([rule]).toString().split(".")[1]
    );

    dispatch({
      type: GET_MAIN_HEADING,
      payload: mainHeadings,
    });

    dispatch({
      type: GET_SUBHEADING,
      payload: subHeadings,
    });

    dispatch({
      type: GET_RULES,
      payload: rules,
    });
  };

  // Set Loading
  const setIsLoading = () => dispatch({ type: SET_LOADING });

  // Set isActive
  const setIsActive = (index) =>
    dispatch({
      type: IS_ACTIVE,
      payload: { index },
    });

  // Return Contex Provider to wrap up the whole App
  return (
    <RulesContext.Provider
      value={{
        getData: state.getData,
        getIntro: state.getIntro,
        getMainHeadings: state.getMainHeadings,
        getSubHeadings: state.getSubHeadings,
        getRules: state.getRules,
        isLoading: state.isLoading,
        isActive: state.isActive,
        setIsActive,
        setIsLoading,
      }}
    >
      {props.children}
    </RulesContext.Provider>
  );
};

export default RulesState;
