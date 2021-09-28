import { useState, useEffect } from 'react'
import { Typography, Box, Button, LinearProgress } from '@mui/material'
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
			{groupList.length === 0 ? <LinearProgress /> : groupList.map((arr: string[]) => {
				const litera = (arr[0] as string).substr(0,1)
				return (
					<Box key={litera}>
						<Typography variant='h5' className={styles.categoryTitle}>{litera}</Typography>
						{ arr.map(group => (
							<Button
								className={styles.groupButton}
								variant="outlined" size="small"
								onClick={() => {
									setGroupSelected(group);
									setOpen(true)
								}}
								key={group}>{group}</Button>
						))}
					</Box>
				)
			})}
			<EditTimetableDialog group={groupSelected} open={open} setOpen={setOpen} />
		</Box>
	)
}

export default PageTimetable