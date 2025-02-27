import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { CircularProgress, LinearProgress } from '@mui/material';
import { green } from '@mui/material/colors';

export default function ConfirmAlert({ open, id, onClose, loading, onConfirm }) {

  
    return (
      <Dialog
        open={open}
        onClose={() => onClose(false)}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm Task Completion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this task as done?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose({value:false,id:null})} autoFocus>
            Cancel
          </Button>
          <Button 
            onClick={() => onConfirm(id)} 
            autoFocus 
            disabled={loading}
        >
            Confirm
          </Button>
          {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
            { loading && <LinearProgress color="inherit"/> }
        </DialogActions>
      </Dialog>
    );
  }
  
ConfirmAlert.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    id:PropTypes.number,
    loading:PropTypes.bool,
};