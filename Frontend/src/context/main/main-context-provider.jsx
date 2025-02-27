import PropTypes from 'prop-types';
import {useMemo, useReducer, useCallback, useEffect} from 'react';

import axios, {endpoints} from '../../utils/axios';

import {MainContext} from './main-context';

// state variable initial states
const initialState = {
  loading: false,
  create_task:null,
  tasks_list:[],
  task_list_loading:false,
  updating:false,
  update_task:null,
};

// reducer
const reducer = (state, action) => {

  if (action.type === 'INITIAL') {
    return {
      loading: action.payload.loading, 
      create_task: action.payload.create_task,
      tasks_list: action.payload.tasks_list,
      task_list_loading: action.payload.task_list_loading,
      updating: action.payload.updating,
      update_task: action.payload.update_task,
      
    };
  }

  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading:action.payload.loading
    };
  }

  if (action.type === 'CREATE_TASK') {
    return {
      ...state,
      create_task:action.payload.create_task
    };
  }

  if (action.type === 'GET_TASKS') {
    return {
      ...state,
      tasks_list:action.payload.tasks_list
    };
  }

  if (action.type === 'GET_TASKS_LOADING') {
    return {
      ...state,
      task_list_loading:action.payload.task_list_loading
    };
  }

  if (action.type === 'UPDATE_TASK_LOADING') {
    return {
      ...state,
      task_list_loading:action.payload.task_list_loading
    };
  }

  if (action.type === 'UPDATE_TASK') {
    return {
      ...state,
      update_task:action.payload.update_task
    };
  }
  return state;

};


export function MainContextProvider({children}) {

  const [state, dispatch] = useReducer(reducer, initialState);

  // Initially running functio
  const initialize = useCallback(async () => {

    dispatch({
      type: 'INITIAL',
      payload: {
        loading:false,
        create_task: null,
        tasks_list:[],
        task_list_loading:false,
        updating:false,
        update_task:null,
      },
    },[]);

  },[]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // create task functio
  const createTask = useCallback(async (task) => {

    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading: true,
      },
    });

    try {

    const response = await axios.post(`${endpoints.add_item}`,task);

    const { success, message,data } = response.data;
    
    dispatch({
      type: 'CREATE_TASK',
      payload: {
        create_task: {
          success,
          message,
          data
        },
      },
    });

    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading: false,
      },
    });

    setTimeout(() => {

      dispatch({
        type: 'CREATE_TASK',
        payload: {
          create_task: null,
        },
      });
      
    }, 2000);

    // eslint-disable-next-line no-unused-vars
    } catch (error) {

      dispatch({
        type: 'CREATE_TASK',
        payload: {
          create_task: {
            success:false,
            message:"Failed to add task",
            data:null
          },
        },
      });

      dispatch({
        type: 'SET_LOADING',
        payload: {
          loading: false,
        },
      });

      setTimeout(() => {

        dispatch({
          type: 'CREATE_TASK',
          payload: {
            create_task: null,
          },
        });
        
      }, 2000);

    }
  }, []);
  
  // getting tasks list for user function
  const getTaskForUser = useCallback(async () => {

    try {

      dispatch({
        type: 'GET_TASKS_LOADING',
        payload: {
          task_list_loading: true,
        },
      });

      const response = await axios.get(endpoints.get_items);

      const { data } = response.data;

      
      dispatch({
        type: 'GET_TASKS',
        payload: {
          tasks_list: data,
        },
      });

      dispatch({
        type: 'GET_TASKS_LOADING',
        payload: {
          task_list_loading: false,
        },
      });

    // eslint-disable-next-line no-unused-vars
    } catch (error) {

      dispatch({
        type: 'GET_TASKS',
        payload: {
          tasks_list: [],
        },
      });

      dispatch({
        type: 'GET_TASKS_LOADING',
        payload: {
          task_list_loading: false,
        },
      });

    }
  }, []);

  // mark task done functio
  const markTaskAsDone = useCallback(async (taskId) => {
    try {
      dispatch({ type: 'UPDATE_TASK_LOADING', payload: { updating: true } });
  
      const response = await axios.put(`${endpoints.mark_as_done}/${taskId}`);
  
      if (response.status === 200) {

        const {data, message, success} = response.data;

        dispatch({
          type: 'UPDATE_TASK',
          payload: { 
            update_task:{
              data,
              message,
              success
            }
          },
        });

        await getTaskForUser();

      } else {
        throw new Error('Failed to update task');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      
      dispatch({
        type: 'UPDATE_TASK',
        payload: { 
          update_task: {
            data:null,
            message:"Failed to task done",
            success: false
          } 
        },
      });
    } finally {

      dispatch({ type: 'UPDATE_TASK_LOADING', payload: { updating: false } });
      
      setTimeout(() => {
        dispatch({
          type: 'UPDATE_TASK',
          payload: { 
            update_task: null
          },
        });
      }, 3000);
    }
  }, [getTaskForUser]);
  
  

  // ----------------------------------------------------------------------


  // create all the nessasary global states and function
  const memoizedValue = useMemo(
    () => ({
      loading: state.loading,
      create_task: state.create_task,
      tasks_list: state.tasks_list,
      task_list_loading: state.task_list_loading,
      update_task: state.update_task,
      updating: state.updating,
      
      createTask,
      getTaskForUser,
      markTaskAsDone,
    }), [
          state,

          createTask,
          getTaskForUser,
          markTaskAsDone
        ]);

  // applying the memoized value to Main Context
  return <MainContext.Provider value={memoizedValue}>{children}</MainContext.Provider>;
}

MainContextProvider.propTypes = {
  children: PropTypes.node,
};
