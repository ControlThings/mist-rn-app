/**
 *@flow
 */
 import React, {Component} from 'react';
 import { Text } from 'react-native';

 //Import redux package and store connected to redux
import { Provider, connect } from "react-redux";
import store from "./redux/store";

//Import translations package 
import { IntlProvider, addLocaleData } from "react-intl";

//Add internationalization data, specifies date, time, number, formats for each language
import english from "react-intl/locale-data/en.js";
import swedish from "react-intl/locale-data/sv.js";
import finnish from "react-intl/locale-data/fi.js";
addLocaleData([...english, ...swedish, ...finnish]);

//Import generated translations file more information how to generate in doc/generate-translations.txt
import translations from "./translations/all.json";
require("intl");

//load's mist values to redux
import MistWrapper from "./mistWrapper/wrapper";

import Root from "./src/app/Root";

//App global state also visible in debugger if redux-devtools-extension is installed
const mapState = ({}) => ({});

//Dispatch functions to redux actions this way
const mapDispatch = (dispatch) => ({});

//Declare  mapStates and mapDispatches, so they are accessible in the Component 
type Props = {};

//Declare local states
type State = {};

//Main component
class Content extends Component<Props, State> {

  render() {
    return (
    <IntlProvider
        messages={translations["en"]}
        locale="en"
        defaultLocale="en"
        textComponent={Text}
    > 
        <Root/>
    </IntlProvider>
    );
  }
}

//Connect the component whit global states
const ConnectedApp = connect(mapState, mapDispatch)(Content);

const App = () => {
  return (
    <Provider store={store}>
      <MistWrapper/>
      <ConnectedApp/>
    </Provider>
  )
}

export default App;