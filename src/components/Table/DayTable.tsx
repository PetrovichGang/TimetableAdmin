import * as React from 'react'
import { Box, Typography } from '@mui/material'
import { Field } from 'formik'
import styles from '../../style/pages.module.css'

interface IDayTableProps {
    day: string
    dayProp: string
}

interface IDayABProps {
    dayProp: string
    pairNum: number
}

const DayAB: React.FunctionComponent<IDayABProps> = ({ dayProp, pairNum }) =>
    <div className={styles.inputGap}>
        <Typography>{pairNum}</Typography>
        <Field name={`Days.${dayProp}.a.p${pairNum}`} component="textarea" />
        <Field name={`Days.${dayProp}.b.p${pairNum}`} component="textarea" />
    </div>

const DayTable: React.FunctionComponent<IDayTableProps> = ({ day, dayProp }) => {
    return (
        <Box>
            <Typography variant='h6' className={styles.dayName}>{day}</Typography>
            <div className={styles.topHeader}>
                <Typography variant='caption'>Четная неделя/Все недели</Typography>
                <Typography variant='caption'>Нечетная неделя</Typography>
            </div>
            { [1,2,3,4].map(n => <DayAB key={n} dayProp={dayProp} pairNum={n} />) }
        </Box>
    )
}

export default DayTable

/*<Autocomplete freeSolo fullWidth
                value={formik.values.Days[dayProp].a['p'+pairNum]}
                onChange={(e, value) => formik.setFieldValue(aField, value)}
                options={autocompletePlaceholder}
                renderInput={(params) => <TextField {...params} label={`${pairNum}-я пара (четная/все)`} />}
            />
            <Autocomplete freeSolo fullWidth
                id={bField}
                value={formik.values.Days[dayProp].b['p'+pairNum]}
                onChange={(e, value) => formik.setFieldValue(bField, value)}
                options={autocompletePlaceholder}
                renderInput={(params) => <TextField {...params} label={`${pairNum}-я пара (нечетная)`} />}
            />
    const aField = `Days.${dayProp}.a.p${pairNum}`
    const bField = `Days.${dayProp}.b.p${pairNum}`
const autocompletePlaceholder = ['suck', 'dick']*/