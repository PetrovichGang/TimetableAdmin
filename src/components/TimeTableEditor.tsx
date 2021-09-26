import * as React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { createTheme, makeStyles, Theme } from '@mui/material';

interface ITimeTableEditorProps {
    groupTimetable: any
    onChange: (pair: string, day: string, value: string) => void
}

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: '#',
        sortable: false,
        width: 16,
    },
    {
        width: 300,
        field: 'MON',
        headerName: 'Понедельник',
        sortable: false,
        editable: true
    },
    {
        width: 300,
        field: 'TUE',
        headerName: 'Вторник',
        sortable: false,
        editable: true
    },
    {
        width: 300,
        field: 'WED',
        headerName: 'Среда',
        sortable: false,
        editable: true
    },
    {
        width: 300,
        field: 'THU',
        headerName: 'Четверг',
        sortable: false,
        editable: true
    },
    {
        width: 300,
        field: 'FRI',
        headerName: 'Пятница',
        sortable: false,
        editable: true
    },
    {
        width: 300,
        field: 'SAT',
        headerName: 'Суббота',
        sortable: false,
        editable: true
    }
]

const TimeTableEditor : React.FunctionComponent<ITimeTableEditorProps> = ({ groupTimetable, onChange }) => {
    const handleEditRowsModelChange = (params: any) =>
      onChange(params.id, params.field, params.value)

    return (
            <DataGrid
                getRowClassName={(params) => {
                    if ((params.getValue(params.id, 'id') as any).substr(0,1) % 2 == 0)
                    return 'gay'
                    else return ''
                }
                }
                rows={groupTimetable}
                columns={columns}
                onCellEditCommit={handleEditRowsModelChange}
                autoHeight autoPageSize disableColumnSelector disableColumnMenu hideFooter
            />
    )
}

export default TimeTableEditor