import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { TextField, Button, Typography, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Snackbar, Alert, CircularProgress, LinearProgress, Stack, Skeleton } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useMainContext } from '../context/hooks/use-main-context';
import { useEffect } from 'react';
import { grey } from '@mui/material/colors';

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

  const {create_task, createTask, loading, tasks_list, task_list_loading, getTaskForUser} = useMainContext()

  const [task, setTask] = React.useState({
    title: '',
    description: '',
  });
  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarType, setSnackbarType] = React.useState("success");

  const getTasksList = React.useCallback(async () => {

    await getTaskForUser?.()
    
  }, [getTaskForUser]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    
    await createTask?.(task)

  };

  useEffect(() => {
    getTasksList()
  }, [getTasksList])
  

  useEffect(() => {
    
    if(create_task && create_task.success){
      showSnackBar(create_task.message,'success')
      setTask({
        title: '',
        description: '',
      })
    }
    else if(create_task && !create_task.success){
      showSnackBar(create_task.message,'error')
    }

  }, [create_task])

  const showSnackBar = (message, type) => {
    setSnackbarMessage(message || (type === "success" ? "Task Added Successfully" : "Failed to Add Task"));
    setSnackbarType(type);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
                            flexDirection: { xs: "column", sm: "row" }, // Column in mobile, row in larger screens
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

                          {/* Done Button (Moves below in mobile view) */}
                          <Box
                            sx={{
                              mt: { xs: 1, sm: 0 }, // Margin top in mobile view
                              width: { xs: "100%", sm: "auto" }, // Full width in mobile
                              display: "flex",
                              justifyContent: { xs: "flex-end", sm: "center" }, // Align properly
                            }}
                          >
                            <Button
                              variant="outlined"
                              loadingPosition="end"
                              sx={{ mt: 2, height: "25px", width: { xs: "100%", sm: "auto" } }}
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
    </React.Fragment>
  )
}
