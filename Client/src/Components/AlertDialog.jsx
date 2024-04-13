import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function AlertDialog({ open, handleClose, title, content, confirmText, cancelText, onConfirm, onCancel }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: { borderRadius: 25 },
              }}
        >
            <DialogTitle style={{ textAlign: 'center' }}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ textAlign: 'center' }}>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ margin: '16px', justifyContent: 'center', alignItems: 'center' }}>
                {confirmText && (
                    <Button variant="contained" onClick={onConfirm} color="primary">
                        {confirmText}
                    </Button>
                )}
                {cancelText && (
                    <Button variant="contained" onClick={onCancel} color="secondary">
                        {cancelText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;