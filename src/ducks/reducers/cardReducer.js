import axios from 'axios'

const initialState = {
    editHeaderID: 0
  };


const EDIT_HEADER_ID = 'EDIT_HEADER_ID'
const HANDLE_HEADER = 'HANDLE_HEADER'
const UPDATE_NEW_HEADER = 'UPDATE_NEW_HEADER'


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

export function updateHeader(newHeader, cardID){
    return {
        type: UPDATE_NEW_HEADER,
        payload: axios.post('http://localhost:3001/api/updateHeader', {newHeader, cardID}).then(response => console.log(response.data))
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