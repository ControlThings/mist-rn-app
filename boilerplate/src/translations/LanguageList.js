// @flow

import React from "react";
import { connect } from "react-redux";

//import appActions from "../redux/actions/appActions";

import constants from "../../constants";
import ListView from "../commission/components/ListView";

const mapState = ({ app }) => ({ language: "en"/*app.language*/ });

const mapDispatch = (dispatch) => ({
  saveLanguage: (language) =>  dispatch(console.log("SAVE LANGUAGE")) //dispatch(appActions.saveLanguage(language))
});

type Props = { 
  language: string, 
  saveLanguage: (language: string) => void 
};

const LanguageList = (props: Props) => {
  console.log(constants, props)
  return (
    <ListView
      items={constants.languages}
      saveChange={props.saveLanguage}
      selected={props.language}
    />
  );
};

export default connect(mapState, mapDispatch)(LanguageList);
