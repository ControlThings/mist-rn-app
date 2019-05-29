//@flow
import mist from "react-native-mist-library";

type cb = (err: string, data: any) => void;

export function create(alias: string, cb?: cb) {
  return mist.request("wish.identity.create", [null, alias], (err, data) => {
    if (err) {
      console.log("wish.identity.create Error:", data);
    }
    if (cb) {
      cb(err, data);   
    }
  });
}

export function list(cb: cb) {
  return mist.request("wish.identity.list", [null], (err, data) => {
    if (err) {
      console.log("wish.identity.list Error:", data);
    }
    if (cb) {
      cb(err, data);   
    }
  });
}

export default {
  create: create,
  list: list
}