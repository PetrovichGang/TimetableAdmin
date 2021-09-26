import { useState, useEffect } from 'react'
import { Typography, Box, Button } from '@mui/material'
import styles from '../style/pages.module.css'
import EditTimetableDialog from '../components/Table/EditTimetableDialog';
var _ = require('lodash');

declare global {
  interface Window { dbg: any; }
}

const PageTimetable: React.FunctionComponent = () => {
	const [groupList, setGroupList] = useState([])
	const [groupSelected, setGroupSelected] = useState("")
	const [open, setOpen] = useState(false)

	const writeChanges = (tt: any) => {
		console.log(JSON.stringify(tt))
		fetch('http://localhost:8000/api/groups', {
		method: 'POST',
		body: JSON.stringify(tt)
		})
	}

	useEffect(() => {
		fetch("http://localhost:8000/api/groups")
			.then(res => res.json())
			.then(
				(result) => {
					console.log("Fetched grp")
					setGroupList(_.values(_.groupBy(result.Groups, (x: string) => x.substr(0, 1))))
				},
				(error) => {
					console.log(error)
				}
			)
	}, [])

	return (
		<Box>
			{groupList.map((arr: string[]) =>
				<Box>
					<Typography variant='h5' className={styles.categoryTitle}>{(arr[0] as string).substr(0,1)}</Typography>
					{ arr.map(group => <Button
						className={styles.groupButton}
						variant="outlined" size="small"
						onClick={() => {setGroupSelected(group);setOpen(true)}}
						>{group}</Button>) }
				</Box>
			)}
			<EditTimetableDialog group={groupSelected} open={open} setOpen={setOpen} />
		</Box>
	)
}

export default PageTimetable