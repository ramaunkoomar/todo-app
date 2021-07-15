import {ADD_TODO,STATUS_CHANGE} from './type';

export const add_todos=(data)=>dispatch=>{
    console.log('i am from acti0on',data)
    dispatch({type:ADD_TODO,payload:data})
}


export const change_status=(data)=>dispatch=>{
    dispatch({type:STATUS_CHANGE,payload:data});
}