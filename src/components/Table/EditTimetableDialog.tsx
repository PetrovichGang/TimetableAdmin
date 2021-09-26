import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DayTable from './DayTable';
import timetableDefaults from '../../schemas/timetableDefaults';
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
  const [timetable, setTimetable] = useState({})
  const handleClose = () => {
      setOpen(false)
        console.log(timetable)
    }
	useEffect(() => {
        if (group !== "")
		fetch(`http://localhost:8000/api/timetable?group=${group}`)
			.then(res => res.json())
			.then(
				(result) => {
					setTimetable(_.defaultsDeep(result[0], timetableDefaults))
				},
				(error) => {
					console.log(error)
				}
			)
	}, [group])

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> {group} </DialogTitle>
        <DialogContent>
            { daysList.map(day => <DayTable day={day[1]} dayProp={day[0]} timetable={timetable} setTimetable={setTimetable} />) }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Загрузить на сервер</Button>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogActions>
      </Dialog>
  );
}

export default EditTimetableDialog