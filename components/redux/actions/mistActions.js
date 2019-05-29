//@flow
import { mistTypes } from "./types";
import mist from "react-native-mist-library";

const mistActions = {
  /*  identityCreate: (alias: string) => async (dispatch: any, getState: () => any) => {
        const { identities } = getState().mist;
        mist.request("wish.identity.create", [null, alias], (err, data) => {
            if (err) {
                return;
            }
            identities.push(data);
            dispatch({ type: mistTypes.IDENTITIES, value: identities });
        });
    
    }, */   
    setIdentities: (value: Array<Identity>) => async (dispatch: any) => {
        dispatch({ type: mistTypes.IDENTITIES, value: value });
    },
    setOwnIdentity: (value: Identity) => async (dispatch: any) => {
        dispatch({ type: mistTypes.OWN_IDENTITY, value: value });
    },
    setPeers: (value: Object) => async (dispatch: any) => {
        dispatch({ type: mistTypes.PEERS, value: value})
    },
    addModel: (id: string, value: Object) => async (dispatch: any) => {
        dispatch({ type: mistTypes.ADD_MODEL, value: {[id]: value}})
    },
    removeModel: (value: string) => async (dispatch: any) => {
        dispatch({ type: mistTypes.REMOVE_MODEL, value: value})
    },
    updateEndpoint: (id: string, ep: string, value: Object) => async (dispatch: any) => {
        dispatch({ type: mistTypes.UPDATE_ENDPOINT, value: {id: id, ep: ep, value: value}})
    },
    removeEndpoint: (value: string) => async (dispatch: any) => {
        dispatch({ type: mistTypes.REMOVE_ENDPOINT, value: value})
    }
}

export default mistActions;