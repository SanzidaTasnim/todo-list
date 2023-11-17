import { useState } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Todo = () => {
  const [ inputData , setInputData ] = useState("");
  const [ tasks , setTasks ] = useState( [] );
  const [ completed , setCompleted ] = useState( [] );

  function addTask() {
   if( inputData.trim() !== '' ) {
      setTasks( [ ...tasks , inputData ] );
      setInputData( '' );
      setCompleted([...completed, false ]);
   }
  }
  function deleteTask(id) {
     let updatedTask = [ ...tasks ];
     let updatedCompleted = [ ...completed];
     Swal.fire({
      title: 'Warning!',
      text: `Do you want to delete task no:${id}`,
      icon: 'warning',
      confirmButtonText: 'Confirm'
    })
     updatedTask.splice( id, 1 );
     updatedCompleted.splice( id, 1 );
     setTasks( updatedTask );
     setCompleted( updatedCompleted );
  }
  function clearTasks() {
     setTasks( [] );
     setCompleted( [] );
  }
  function checkedTask( id ) {
     let updatedCompleted = [ ...completed ];
     updatedCompleted[ id ] = true;
     setCompleted( updatedCompleted );
  }
  return (
    <>
      <div className="wrap">
         <div className="main-wrap">
            <div className="main-head">
               <h1>Todo List</h1>
            </div>
            <div className="main-input">
               <input 
                  type="text" 
                  placeholder="Enter a task..." 
                  value={ inputData } 
                  onChange={ (e) => setInputData( e.target.value ) }
               />
               <button onClick={ addTask }>
                  <FontAwesomeIcon icon={ faPlus } title="Add Task" />
                  <span>Add Task</span>
               </button>
            </div>
         </div>
      </div>
      {
         tasks.map( ( task , index ) => {
            return (
               <div className="showitem-wrap" key={ index } >
                  <div className="show-items">
                     <h2 className={`${ completed[ index ] === true ? 'completed-linethrough' : '' }`}> { task } </h2>
                     <div className="showitems-icon">
                        <a href="#" className={`check ${ completed[ index ] === true ? 'completed' : '' }`} onClick={ () => checkedTask( index ) }>
                           <FontAwesomeIcon icon={ faCheckCircle } title="Completed" />
                        </a>
                        <a href="#" className="edit" >
                           <FontAwesomeIcon icon={ faEdit } title="Edit Task" />
                        </a>
                        <a href="#" className="delete" onClick={ () => deleteTask(index) } >
                           <FontAwesomeIcon icon={ faTrashAlt } title="Delete Task" />
                        </a>
                     </div>
                  </div>
               </div>
            )
         })
      }
      <div className="footer">
         <div className="foot-wrap">
            <p>You have 3 pending tasks </p>
            <button onClick={ clearTasks }>Clear All</button>
         </div>
      </div>
    </>
  )
}

export default Todo;