import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IDialogInfoProps {
    content: string | null
    onClose: () => void
}

const DialogInfo : React.FunctionComponent<IDialogInfoProps> = ({content, onClose}) => 
   (
    <div>
      <Dialog open={content !== null} onClose={onClose} scroll='paper'>
        <DialogTitle>Результат</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  )

export default DialogInfo