//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import mist from "react-native-mist-library";

import { Buffer } from "buffer";

import identity from "./identity";
import listPeers from "./listPeers";
import control from "./control";

import mistActions from "../redux/actions/mistActions";

const mapState = ({ mist }) => ({
  models: mist.models,
  peers: mist.peers,
  endpoints: mist.endpoints
})

const mapDispatch = (dispatch) => ({
  setIdentities: (value: Array<Identity>) => dispatch(mistActions.setIdentities(value)),
  setOwnIdentity: (value: Identity) => dispatch(mistActions.setOwnIdentity(value)),
  setPeers: (value: Object) => dispatch(mistActions.setPeers(value)),
  addModel: (id: string, value: Object) => dispatch(mistActions.addModel(id, value)),
  removeModel: (value: string) => dispatch(mistActions.removeModel(value)),
  updateEndpoint: (id: string, ep: string, value: Object) => dispatch(mistActions.updateEndpoint(id, ep, value)),
  removeEndpoint: (value: string) => dispatch(mistActions.removeEndpoint(value))
});

type Props = {
  setIdentities: (value: Array<Identity>) => void,
  setOwnIdentity: (value: Identity) => void,
  setPeers: (value: Object) => void,
  addModel: (id: string, value: Object) => void,
  removeModel: (value: string) => void,
  updateEndpoint: (id: string, ep: string, value: Object) => void,
  removeEndpoint: (value: string) => void,
  models: Object,
  peers: Object,
  endpoints: Object
};

type State = {
  isMounted: boolean
};

let followIds: Object = {};
let wishSignalsId: number = 0;
let mistSignalsId: number = 0;

class MistWrapper extends Component<Props, State> {
  state = { 
    isMounted: false,
  };

   

  componentDidMount() {
    this.state.isMounted = true;
    this.mistSignals();
    this.identityList();
    this.setPeersAndModel();
    console.log("MistWrapper didMount");
  }

  componentWillUnmount() {
    console.log("MistWrapper willUnmount");
    this.cancel();
    this.state.isMounted = false;
  }

  componentDidUpdate(prevProps: any) {
    console.log("MistWrapper didUpdate");
  }

  getId(peer: Peer) {
    let id = Buffer.concat([peer.ruid.slice(0, 4), peer.rsid.slice(0, 4)]).toString("hex");
    return id;
  }

  wishSignals() {
    const self = this;
    if (wishSignalsId !== 0) {
      mist.cancel(wishSignalsId);
      wishSignalsId = 0;
    }
    wishSignalsId = mist.request("wish.signals", [null], (err, data) => {
      if (err) {
        console.log("remote peer signal error: ", data);
        return;
      }
      switch (data[0]) {
        case "ok":
          self.identityList();
          break;
        case "identity":
          self.identityList();
          break;
        default:
          console.log("Unsupported wish signal: " + data[0] );
          break;
      }
      console.log("wish Signals", data[0]);
    });
    console.log("wishSignalsId", wishSignalsId);
  }

  mistSignals() {
    const self = this;
    if (mistSignalsId !== 0) {
      mist.cancel(mistSignalsId);
      mistSignalsId = 0;
    }
    mistSignalsId = mist.request("signals", [null], (err, data) => {
      if (err) {
        console.log("remote peer signal error: ", data);
        return;
      }
      switch (data[0]) {
        case "ok":
          self.setPeersAndModel();
          break;
        case "ready":
          self.wishSignals();
          break;
        case "peers":
          self.setPeersAndModel();
          break;
        default:
          console.log("Unsupported mist signal: " + data[0] );
          break;
      }
      console.log("mist Signals", data[0]);
    });
    console.log("mistSignalsId", mistSignalsId)
  }

  identityList() {
    const self = this;
    identity.list((err, data) => {
      if (err) {
        return;
      }
      for (const i in data) {
        if (data[i].privkey) {
          self.props.setOwnIdentity(data[i]);
          break;
        }
      }
      self.props.setIdentities(data);
    })
  }

  setPeersAndModel() {
    const self = this;
    listPeers((err, data) => {
      if (err) {
        return;
      }
      let peers = {};
      const modelKeys = Object.keys(self.props.models)
      const endpointKeys = Object.keys(self.props.endpoints)
      for (const i in data) {
        const id = self.getId(data[i]);
        peers[id] = data[i];
        //get model if peer is online and the model isn't downloaded yet!
        if (data[i].online && !(id in self.props.models) ) {
          self.getModel(id, data[i]);
        }
      }
      self.props.setPeers(peers);
      //Remove model and endpoints if peer is removed
      for (const key of modelKeys) {
        if (!(key in self.props.peers)) {
          self.props.removeModel(key);
        }
      }
      for (const key of endpointKeys) {
        if (!(key in self.props.peers)) {
          self.props.removeEndpoint(key);
          if ( followIds[key] ) {
            mist.cancel(followIds[key]);
            followIds[key] = null;
          }
        }
      }
    });
  }

  getModel(id: string, peer: Peer, cb) {
    const self = this;
    control.model(peer, (err, data) => {
      if (err) {
        return
      }
      self.props.addModel(id, data);
    })
  }

  follow(id: string, peer: Peer) {
    const self = this;
    if (followIds[id]) {
      mist.cancel(followIds[id]);
      followIds[id] = null;
    }
    if (peer.online) {
      ((id, peer) => {
        followIds[id] = control.follow(peer, (err, data) => { 
          if (err) {
            return
          }
          self.props.updateEndpoint(id, data.id, data.data);
        })
      })(id, peer);
    }
  }

  cancel() {
    if (wishSignalsId !== 0) {
      mist.cancel(wishSignalsId);
      mistSignalsId = 0;
    }
     if (mistSignalsId !== 0) {
      mist.cancel(mistSignalsId);
      mistSignalsId = 0;
    }
    for (let i in followIds) {
      mist.cancel(followIds[i]);
    }
    followIds = {};
  }

  shouldComponentUpdate(nextProps, nextState) { 

    //cancel or follow peers on new props
    for (const key of Object.keys(nextProps.peers)){
      if (!(key in this.props.peers)) {
        this.follow(key, nextProps.peers[key]);
      }
      else if (nextProps.peers[key].online !== this.props.peers[key].online) {
        this.follow(key, nextProps.peers[key]);
      }
    }  
    return false
  }

  render() {
    console.log("MistWrapper render");
    return null;
  }
}

export default connect(
  mapState,
  mapDispatch
)(MistWrapper);
