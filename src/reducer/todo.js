import {ADD_TODO,STATUS_CHANGE} from '../action/type';

const initialState={
   todo:[]
};

export default function(state=initialState,action){
    const {type,payload}=action;

    switch(type){

        case ADD_TODO:
            return {
                ...state,
                todo:[...state.todo,payload],
            }
        case STATUS_CHANGE:
            state.todo[payload.index].status=payload.status;
            return{
                ...state,
                todo:state.todo,
               
            }
        default :
          return state
    }
}