//@flow
import mist from "react-native-mist-library";

type cb = (err: string, data: any) => void;

export function model(peer: Peer, cb?: cb) {
  return mist.request("mist.control.model", [peer], (err, data) => {
    if (err) {
      console.log("mist.control.model Error:", data);
    }
    if (cb) {
      cb(err, data);   
    }
  });
}

export function read(peer: Peer, endpoint: string, cb: cb) {
  return mist.request("mist.control.read", [peer, endpoint], (err, data) => {
    if (err) {
      console.log("mist.control.read Error:", data);
    }
    if (cb) {
      cb(err, data);   
    }
  });
}

export function follow(peer: Peer, cb?: cb) {
  return mist.request("mist.control.follow", [peer], (err, data) => {
    if (err) {
      console.log("mist.control.follow Error:", data);
    }
    if (cb) {
      cb(err, data);   
    }
  });
}

export default {
  model: model,
  read: read,
  follow, follow
}