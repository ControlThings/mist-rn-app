/**
 *@flow
 */
 import React, {Component} from 'react';

 //Import redux package and store connected to redux
import { Provider, connect } from "react-redux";
import store from "./redux/store";

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
        <Root/>
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