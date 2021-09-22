import { useState, useEffect } from 'react'
import { Divider, Typography, Toolbar, Drawer, CssBaseline, Box, AppBar, IconButton, Fab, styled } from '@mui/material'
import GroupList from './components/GroupList'
import MenuIcon from '@mui/icons-material/Menu'
import WandIcon from '@mui/icons-material/AutoFixHighTwoTone'
import TimeTableEditor from './components/TimeTableEditor'
import DialogInfo from './components/DialogInfo'
import daysSchema from './schemas/timetable'
import converter from './utils/converter'

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

const App = () => {
	const [generatedJSON, setGeneratedJSON] = useState<string|null>(null)
	const [mobileOpen, setMobileOpen] = useState(false)
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
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
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

	useEffect(() => {
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
	}, [])

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<GroupList groupList={groupList} groupSelected={groupSelected} onSelect={onGroupSelect} />
		</div>
	)

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						{groupSelected}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{ keepMounted: true }}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					open
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</Box>
			<Box component="main" sx={{ flexGrow: 1 }}>
				<Toolbar>
        </Toolbar>
				<TimeTableEditor groupTimetable={groupTable} onChange={handleTimetableChanged}/>
        
        <StyledFab variant="extended" color="primary" onClick={()=>writeChanges(converter.toAPIFormat(groupChanges, groupSelected))}>
            <WandIcon sx={{ mr: 1 }} />
             в апи
        </StyledFab>
			</Box>
      <DialogInfo content={generatedJSON} onClose={handleDialogClose} />
		</Box>
	)
}

export default App