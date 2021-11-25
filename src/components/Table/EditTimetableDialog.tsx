import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DayTable from './DayTable';
import timetableDefaults from '../../schemas/timetableDefaults';
import { Field, Form, Formik } from 'formik'
import styles from '../../style/pages.module.css'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import { IconButton, LinearProgress } from '@mui/material';
import API_URL from '../../config';
var _ = require('lodash');

interface IEditTimetableDialogProps {
    group: string
    open: boolean
    setOpen: (value: boolean) => void
}

const daysList = [
    ["MON", "Понедельник"],
    ["TUE", "Вторник"],
    ["WED", "Среда"],
    ["THU", "Четверг"],
    ["FRI", "Пятница"],
    ["SAT", "Суббота"]
]

const EditTimetableDialog: React.FunctionComponent<IEditTimetableDialogProps> = ({ group, open, setOpen }) => {
    const [timetable, setTimetable] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const handleClose = (e, reason) => {
        if (reason !== 'backdropClick')
            setOpen(false)
    } 

    function downloadGroup(values) {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(values)], {type: 'application/json'});
        a.href = URL.createObjectURL(file);
        a.download = group;
        a.click();
    }

    useEffect(() => {
        if (group !== "") {
            setLoading(true)
            fetch(`${API_URL}/timetable?group=${group}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setTimetable(_.defaultsDeep(result[0], timetableDefaults))
                        setLoading(false)
                    },
                    (error) => {
                        console.log(error)
                        setLoading(false)
                    }
                )
        }
    }, [group])

    return (
    <Formik
        onSubmit={(values, {setSubmitting}) => {
            fetch(`${API_URL}/groups`, {
                method: 'POST',
                body: JSON.stringify(values)
            })
                .then(res => res.text())
                .then(
                    (result) => {
                        alert(result)
                        setSubmitting(false)
                        setOpen(false)
                    },
                    (error) => {
                        alert(error)
                        setSubmitting(false)
                    }
                )
        }} enableReinitialize 
        initialValues={timetable}>
        {({submitForm, isSubmitting, handleReset, dirty, values}) => {
            return (
            <Form>
                <Dialog className={styles.dialog} disableEscapeKeyDown keepMounted open={open} onClose={handleClose} fullWidth maxWidth='md'>
                    <DialogTitle className={styles.dialogTitleWrap}>
                        
                        <IconButton color="secondary"
                            disabled={isSubmitting}
                            onClick={()=>setOpen(false)}>
                            <KeyboardBackspaceRoundedIcon />
                        </IconButton>
                        <Field name="Group" className={styles.dialogEditableTitle} />
                    </DialogTitle>
                    <DialogContent dividers>
                        { timetable.Days === undefined || loading ? <LinearProgress /> : daysList.map(day =>
                            <DayTable day={day[1]} dayProp={day[0]} />) }
                    </DialogContent>
                    <DialogActions>
                        <Button
                            disabled={isSubmitting || loading}
                            onClick={submitForm}>Загрузить на сервер</Button>
                        <IconButton color="primary" onClick={()=>downloadGroup(values)}
                            disabled={isSubmitting || loading}>
                            <FileDownloadRoundedIcon />
                        </IconButton>
                        <IconButton color="primary"
                            onClick={handleReset}
                            disabled={!dirty || isSubmitting || loading}>
                            <RotateLeftRoundedIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </Form>
            )
        }}
        </Formik>
    );
}

export default EditTimetableDialog