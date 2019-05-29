//@flow
import mist from "react-native-mist-library";

type cb = (err: string, data: any) => void;

export default function listPeers(cb: cb) {
  return mist.request("listPeers", [], (err, data) => {
    if (err) {
      console.log("listPeers Error:", data);
    }
    if (cb) {
      cb(err, data);   
    }
  });
}
