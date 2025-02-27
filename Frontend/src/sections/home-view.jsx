import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { TextField, Button, Typography, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Snackbar, Alert, CircularProgress, LinearProgress, Stack, Skeleton } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useMainContext } from '../context/hooks/use-main-context';
import { useEffect } from 'react';
import { grey } from '@mui/material/colors';
import ConfirmAlert from '../components/alert';
import Lottie from "lottie-react";
import task_completed from "../assets/task_completed.json"; 

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


export default function HomeView() {

  //setting statuses and import context functions
  const {create_task, createTask, loading, tasks_list, task_list_loading, getTaskForUser, update_task, updating, markTaskAsDone} = useMainContext()

  const [task, setTask] = React.useState({
    title: '',
    description: '',
  });
  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarType, setSnackbarType] = React.useState("success");
  const [alertOpen, setAlertOpen] = React.useState({
    value:false,
    id:null
  });
  const [showAnimation, setShowAnimation] = React.useState(false);

  //task list getting function call in context api
  const getTasksList = React.useCallback(async () => {

    try {
      await getTaskForUser?.() //calling the context api function
    } catch {
      showSnackBar("Failed to tasks","info")
    }
    
    
  }, [getTaskForUser]);

  // text input typing chnage handler function 
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // new task submit function
  const handleSubmit = async() => {

    try {
      await createTask?.(task) //calling the context api function
    } catch {
      showSnackBar("Failed to create task","error")
    }
  };

  // snack bar showing handle function
  const showSnackBar = (message, type) => {
    setSnackbarMessage(message || (type === "success" ? "Task Added Successfully" : "Failed to Add Task"));
    setSnackbarType(type);
    setOpen(true);
  };

  //modal close function
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // snackbar function
  const snackBar = ()=>{

    return(
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarType?snackbarType:'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage?snackbarMessage:"Something Went Wrong"}
        </Alert>
      </Snackbar>
    )
  }

  // handle click task done 
  const handleDoneTasks = (id) => {
    setAlertOpen({
      value:true,
      id:id
    });
  };

  // handle mark as done function
  const handleConfirm = async(id) => {
    
    try {
      await markTaskAsDone?.(id) //calling the context api function
    } catch {
      showSnackBar("Failed to done task",'error')
      setAlertOpen({
        value:false,
        id:null
      });
    }
  };

  // use effects for catch varible state changes and handle operations
  useEffect(() => {
    getTasksList()
  }, [getTasksList])
  
  useEffect(() => {
    
    if(create_task && create_task.success){
      getTasksList()
      showSnackBar(create_task.message,'success')
      setTask({
        title: '',
        description: '',
      })
    }
    else if(create_task && !create_task.success){
      showSnackBar(create_task.message,'error')
    }

  }, [create_task, getTasksList])

  useEffect(() => {
    
    if(update_task && update_task.success){
      
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
      }, 2500);

      showSnackBar("Task completed successfully",'success')

      setAlertOpen({
        value:false,
        id:null
      });
    }
    else if(update_task && !update_task.success){
      showSnackBar( typeof update_task.message === 'string'? update_task.message: "Failed to complete task",'error')
      setAlertOpen({
        value:false,
        id:null
      });
    }
  }, [update_task])
  
  // UI output
  return (
    <React.Fragment>
      <CssBaseline />
      
      <Container 
        fixed 
        sx={{ bgcolor: '#f0f0f0', py: 4, borderRadius: 2 }}
      >

        <Box 
            sx={{ 
              bgcolor: 'white',
              minHeight: '85vh',
              p: 4,
              boxShadow: 1, 
            }} 
            borderRadius={5}>

        <Grid bgcolor="white" container spacing={2} justifyContent="space-around" alignItems="center" height='100%' >
            
            <Grid item xs={12} md={5} >

              <Item sx={{borderRadius:5}}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom >
                    <b>Add a Task</b>
                  </Typography>
                </Box>
                
                <TextField
                  label="Task Title"
                  name="title"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={task.title}
                  onChange={handleChange}
                />
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={task.description}
                  onChange={handleChange}
                />
                <Box sx={{ width: '100%' }}>
                  { loading && <LinearProgress color="secondary"/> }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, borderBottomRightRadius:15 }}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    Add
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: grey[50],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </Box>
                
              </Item>
            </Grid>

            
              <Divider orientation="vertical" flexItem sx={{height:"80vh", display: { xs: 'none', md: 'flex' }}}/>

            <Grid item xs={12} md={6}>
              <Item sx={{borderRadius:5}}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                To-Do Tasks List
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="p" component="div">
                Most recent to-do tasks
              </Typography>
              </Box>
              <Demo>
                <List dense={false}>
                  {tasks_list && tasks_list.length > 0 ?
                    (tasks_list.map((item,index)=>{

                      return(
                        <ListItem
                          key={index}
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "flex-start", sm: "center" },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <PendingActionsIcon />
                            </Avatar>
                          </ListItemAvatar>

                          {/* Text Content */}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <ListItemText
                              primary={
                                <Typography variant="body1" fontWeight="bold" noWrap>
                                  {item?.title || ""}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  sx={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2, // Show only 2 lines and cut the rest
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item?.description || ""}
                                </Typography>
                              }
                            />
                          </Box>

                          <Box
                            sx={{
                              mt: { xs: 1, sm: 0 }, 
                              width: { xs: "100%", sm: "auto" },
                              display: "flex",
                              justifyContent: { xs: "flex-end", sm: "center" },
                            }}
                          >
                            <Button
                              variant="outlined"
                              loadingPosition="end"
                              sx={{ mt: 2, height: "25px", width: { xs: "100%", sm: "auto" } }}
                              onClick={()=>handleDoneTasks(item.id)}
                            >
                              Done
                            </Button>
                          </Box>
                        </ListItem>
                      )
                    })
                  )
                    :
                  ( task_list_loading ? 
                    <Stack spacing={1}>
                      <Skeleton variant="rounded" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                    </Stack>
                    :
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography sx={{ mt: 4, mb: 2 }} variant="p" component="div">
                          No To-Do Tasks Found !
                      </Typography>
                    </Box>
                  )
                }
                </List>
              </Demo>
              </Item>
            </Grid>

        </Grid>
          {open && snackBar()}
        </Box>
      </Container>
      {showAnimation && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 9999,
          }}
        >
          <Lottie 
            animationData={task_completed} 
            loop={false} 
            style={{ width: '70vh', height: '70vw' }} 
            speed={10}
          />
        </Box>
      )}
      <ConfirmAlert
        open={alertOpen.value}
        id={alertOpen.id}
        onClose={setAlertOpen}
        loading={updating}
        onConfirm={handleConfirm}
      />
    </React.Fragment>
  )
}
