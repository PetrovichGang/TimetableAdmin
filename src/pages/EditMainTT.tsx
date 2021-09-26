import { useState, useEffect } from 'react'
import { Divider, Typography, Toolbar, Drawer, CssBaseline, Box, AppBar, IconButton, Fab, styled } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import WandIcon from '@mui/icons-material/AutoFixHighTwoTone'
import TimeTableEditor from '../components/TimeTableEditor'
import DialogInfo from '../components/DialogInfo'
import daysSchema from '../schemas/timetable'
import converter from '../utils/converter'
import GroupList from '../components/GroupList'
import { RouteComponentProps } from '@reach/router';

declare global {
  interface Window { dbg: any; }
}
const StyledFab = styled(Fab)({
  position: 'fixed',
  zIndex: 10,
  bottom: 0,
  right: 0,
  margin: 32,
});

const drawerWidth = 240

interface HomeProps extends RouteComponentProps {
    lang?: string;
}


const EditMainTT: React.FunctionComponent<HomeProps> = () => {
	const [generatedJSON, setGeneratedJSON] = useState<string|null>(null)
	const [groupList, setGroupList] = useState([])
	const [timetableFull, setTimetableFull] = useState([])
	const [groupTable, setGroupTable] = useState([])
	const [groupSelected, setGroupSelected] = useState("")
	const [groupChanges, setGroupChanges] = useState<any>({})

	const onGroupSelect = (group: string) => {
    setGroupSelected(group)
    const grp = timetableFull.find((x: any) => x.Group === group) ?? {Days:{}}
    const tableFormat = converter.toTableFormat({ ...daysSchema, ...grp.Days })
    setGroupTable(tableFormat)
    setGroupChanges(tableFormat)
  }
	const handleDialogClose = () => setGeneratedJSON(null)
	const handleTimetableChanged = (pair: string, day: string, value: string) => {
    groupChanges.find((x: any) => x.id === pair)[day] = value
    setGroupChanges(groupChanges)
  }

  const writeChanges = (tt: any) => {
    console.log(JSON.stringify(tt))
    fetch('http://localhost:8000/api/groups', {
      method: 'POST',
      body: JSON.stringify(tt)
    })
  }

	/*useEffect(() => {
		fetch("http://localhost:8000/api/groups")
			.then(res => res.json())
			.then(
				(result) => {
						console.log("Fetched grp")
						setGroupList(result.Groups)
				},
				(error) => {
					console.log(error)
				}
			)
		fetch("http://localhost:8000/api/timetable")
			.then(res => res.json())
			.then(
				(result) => {
						console.log("Fetched tt")
						setTimetableFull(result)
				},
				(error) => {
					console.log(error)
				}
			)
	}, [])*/

	return (<div>hewo</div>
	)
}

export default EditMainTT