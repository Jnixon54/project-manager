import axios from 'axios'

const initialState = {
    editHeaderID: 0
  };


const EDIT_HEADER_ID = 'EDIT_HEADER_ID'
const HANDLE_HEADER = 'HANDLE_HEADER'


export function editCardHeader(cardID, title){
    console.log(cardID, title)
    return {
        type: EDIT_HEADER_ID,
        payload: {cardID, title}
    }
}

export function handleHeader(value){
    return {
        type: HANDLE_HEADER,
        payload: value
    }
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_HEADER_ID:
            return Object.assign({}, state, { editHeaderID: action.payload.cardID, header: action.payload.title })
        case HANDLE_HEADER:
            return Object.assign({}, state, { header: action.payload })
        default:
            return state;
    }
  }