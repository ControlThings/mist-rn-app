//@flow
import { mistTypes } from "../actions/types";

type StateType = {
    identities: Array<Identity>,
    own_identity: Identity | null,
    peers: Object,
    models: Object,
    endpoints: Object
}

const initialState = {
    identities: [],
    own_identity: null,
    peers: {},
    models: {},
    endpoints: {}
}

export default function(state: StateType = initialState, action: any) {
    switch (action.type) {
        case  mistTypes.IDENTITIES:
            return { ...state, identities: action.value };
        case  mistTypes.OWN_IDENTITY:
            return { ...state, own_identity: action.value };
        case mistTypes.PEERS:
            return { ...state, peers: action.value};
        case mistTypes.ADD_MODEL:
            return { ...state, models: {...state.models, ...action.value}};
        case mistTypes.REMOVE_MODEL:
            const {[action.value]: tmpModel, ...newModels } = state.models
            return { ...state, models: newModels};
        case mistTypes.UPDATE_ENDPOINT:
            return { ...state, endpoints: {...state.endpoints, [action.value.id]: {...state.endpoints[action.value.id], [action.value.ep]: action.value.value}}};    
        case mistTypes.REMOVE_ENDPOINT:
            const {[action.value]: tmpEndpoint, ...newEndpoints } = state.endpoints
            return { ...state, endpoints: newEndpoints};                       
        default:        
            return state;
    }
}