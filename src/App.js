import './App.css';
import React,{useState} from 'react';
import {connect} from 'react-redux';
import {add_todos,change_status} from './action/todo';

function App(props) {
   const [todo,setTodo]=useState([])
   const [name,setName]=useState('')
   const [current,setCurrent]=useState(null)

  function getRow(){
    let list=[];
     const onSelect=(value,id)=>{
      props.change_status({index:id,status:value})
       if(value==='Pending'){
         let element=document.getElementById(id);
         element.style.background='red';
         element.style.color='white';
       }
       else if(value==='In Progress'){
        let element=document.getElementById(id);
        element.style.background='yellow';
        element.style.color='black';
       }
       else if (value==='Completed'){
        let element=document.getElementById(id);
        element.style.background='#90ee90';
        element.style.color='white';
       }
       
     }
     if(current==null){
    props.todo.map((element,index)=>{
     if(element.status=='Completed'){
      list.push(
        <tr>
        <td className='title' style={{paddingLeft:20,color:'blue'}}>{element.name}</td>
        <td>
          <select style={{background:"#90ee90",color:'black'}} id={index} onChange={event=>onSelect(event.target.value,index)} className=''>
            <option >Pending</option>
            <option >In Progress</option>  
            <option selected>Completed</option>
          </select>  
        </td>
        <td style={{fontSize:13}}>
       {element.date.toDateString()}
        </td>
        </tr>)

     }
     else if(element.status=='In Progress'){
      list.push(
        <tr>
        <td className='title' style={{paddingLeft:20,color:'blue'}}>{element.name}</td>
        <td>
          <select style={{background:"yellow",color:'black'}} id={index} onChange={event=>onSelect(event.target.value,index)} className=''>
            <option >Pending</option>
            <option selected>In Progress</option>  
            <option>Completed</option>
          </select>  
        </td>
        <td style={{fontSize:13}}>
       {element.date.toDateString()}
        </td>
        </tr>) 
     }
     else{
      list.push(
        <tr>
        <td className='title' style={{paddingLeft:20,color:'blue'}}>{element.name}</td>
        <td>
          <select style={{background:"red",color:'white'}} id={index} onChange={event=>onSelect(event.target.value,index)} className=''>
            <option selected>Pending</option>
            <option >In Progress</option>  
            <option>Completed</option>
          </select>  
        </td>
        <td style={{fontSize:13}}>
       {element.date.toDateString()}
        </td>
        </tr>) 
     }

     }
    
     
     
     
     
     
     
     );
    }

    else if(current=='active'){
      props.todo.map((element,index)=>{
        if(element.status=='Pending' || element.status=='In Progress' ){
          console.log(element.status);
          list.push(
            <tr>
            <td className='title' style={{paddingLeft:20,color:'blue'}}>{element.name}</td>
            <td>
              <select style={{background: element.status=='In Progress'?'yellow':'red',color: element.status=='In Progress'?'black':'white'}} id={index} onChange={event=>onSelect(event.target.value,index)} className=''>
               {element.status=='Pending'?<option selected >Pending</option>:<option>Pending</option>}  
                {element.status=='In Progress'?<option selected>In Progress</option>:<option >In Progress</option>  }   
                <option>Completed</option>
              </select>  
            </td>
            <td style={{fontSize:13}}>
           {element.date.toDateString()}
            </td>
            </tr>)
        }
      });

    }

    else if(current=='completed'){
      props.todo.map((element,index)=>{
        if(element.status=='Completed'){
          list.push(
            <tr>
            <td className='title' style={{paddingLeft:20,color:'blue'}}>{element.name}</td>
            <td>
              <select style={{background:"#90ee90",color:'white'}} id={index} onChange={event=>onSelect(event.target.value,index)} className=''>
                <option >Pending</option>
                <option >In Progress</option>  
                <option selected>Completed</option>
              </select>  
            </td>
            <td style={{fontSize:13}}>
           {element.date.toDateString()}
            </td>
            </tr>)
        }
      });

    }

    
    return list;
  }

   function add_todo(){
      
        let data ={name:name,date:new Date(),status:'Pending'}
        console.log(todo);
        let curdata=todo;
        curdata.push(data);
        props.add_todos(data);
        setTodo([...curdata])
   }


  return (
  <div className='todo-container'>
    <div className='top'>
      <div className='header-area'>
        <h3>TodoList</h3>
      </div>
      <div className='input-area'>
        <div className='input-wrapper'>
          <input placeholder='add todo'  value={name} onChange={e=>setName(e.target.value)} />
          <button style={{width:100}}  onClick={add_todo} >Add todo</button>
        </div>
    
      </div>
    </div>
    <div className='bottom'>
      <table className='column-wrapper'>
        <thead>
        <th className='column1' >Todo</th>
        <th className='column2'>Status</th>
        <th className='column3'>Added On</th>
        </thead>
        <tbody>
         {getRow()}
        </tbody>
      </table> 
       
      <div className='btn-wrapper'>
          <div className='btn-area'>
            <span>Show</span>
            <button className='all'  onClick={e=>setCurrent(null)}>Alll</button>
            <button className='active' onClick={e=>setCurrent('active')} >Active</button>
            <button className='completed' onClick={e=>setCurrent('completed')} >Completed</button>
          </div>
      </div>

    </div>
  </div>
  );
}

function mapStateToProps(state) {
  return {
     todo:state.todo.todo
  }
}


export default connect(mapStateToProps,{add_todos,change_status})(App);
