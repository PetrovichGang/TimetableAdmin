import { useState, useEffect } from 'react'
import { Typography, Box, Button, LinearProgress } from '@mui/material'
import styles from '../style/pages.module.css'
import EditTimetableDialog from '../components/Table/EditTimetableDialog';
import API_URL from '../config';
var _ = require('lodash');

const PageTimetable: React.FunctionComponent = () => {
	const [groupList, setGroupList] = useState([])
	const [groupSelected, setGroupSelected] = useState("")
	const [open, setOpen] = useState(false)
	useEffect(() => {
		fetch(`${API_URL}/groups`)
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
		<Box className={styles.boxLineWrap}>
			{groupList.length === 0 ? <LinearProgress /> : groupList.map((arr: string[]) => {
				const litera = (arr[0] as string).substr(0,1)
				return (
					<Box key={litera} className={styles.boxLine}>
						<Typography variant='h1' className={styles.categoryTitle}>{litera}</Typography>
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