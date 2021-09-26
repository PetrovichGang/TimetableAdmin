import * as React from 'react'
import { Box, TextField, Typography } from '@material-ui/core'
import styles from '../../style/pages.module.css'
import { isConstructorDeclaration } from 'typescript'

interface IDayTableProps {
    day: string
    dayProp: string
    timetable: any
    setTimetable: (value: any) => void
}

interface IDayABProps {
    dayProp: string
    pairNum: number
    timetable: any
    setTimetable: (value: any) => void
}

const DayAB: React.FunctionComponent<IDayABProps> = ({ dayProp, pairNum, timetable, setTimetable }) => {
    //return <div/>
    return timetable.Days === undefined ? <span>Загружаемся...</span> : (
        <div className={styles.inputGap}>
        <TextField
            defaultValue={timetable.Days[dayProp].a[pairNum] || ""}
            label={`${pairNum}-я пара (четная/все)`}
            size="small"
        />
        <TextField
            value={timetable.Days[dayProp].b[pairNum] || ""}
            onChange={e => {
                timetable.Days[dayProp].b[pairNum] = e.target.value
                setTimetable(timetable)
            }}
            label={`${pairNum}-я пара (нечетная)`}
            size="small"
        />
        </div>
    )
}

const DayTable: React.FunctionComponent<IDayTableProps> = ({ day, dayProp, timetable, setTimetable }) => {
    return (
        <Box>
            <Typography variant='h6'>{day}</Typography>
            { [1,2,3,4].map(n => <DayAB dayProp={dayProp} pairNum={n} timetable={timetable} setTimetable={setTimetable} />) }
        </Box>
    )
}

export default DayTable