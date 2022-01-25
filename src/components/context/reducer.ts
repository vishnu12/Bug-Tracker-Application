import { Actions, Data, IState } from "./types";


export default function reducer(state:IState,action:Actions):IState{
    switch (action.type) {
        case 'GET_BUGS':
            return {
                ...state,
                bugs:action.payload
            }

        case 'GET_BUG_BY_ID':
            return {
             ...state,
              bug:state.bugs.find(bug=>bug.id===action.payload.id) as Data
            }  

        case 'ADD_BUG':
            return {
                ...state,
                success:true
            }

        case 'CHANGE_BUG_STATUS':
             return {
                 ...state,
                 success:true
             }
        case 'EDIT_BUG':
            return {
                ...state,
                success:true
            }

        case 'REMOVE_BUG':
            return {
                ...state,
                success:true
            }    

        case 'RESTORE':
            return {
                ...state,
                success:false
            }     
    
        default:
            return state;
    }
}