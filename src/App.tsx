import EditMainTT from "./pages/EditMainTT"
import { Route, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar"
import { IconButton, Typography } from "@mui/material";
import styles from './style/base.module.css'
import { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PageTimetable from "./pages/PageTimetable";

const routeNames: any = {
	'/timetable': 'Расписание',
	'/changes': 'Изменения',
	'/autofill': 'Автозамена'
};

export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
    const menuClick = () => setSidebarOpen(true)
    const routeName = routeNames[useLocation().pathname] || 'Главная';
	return (
		<div style={{ display: 'flex' }}>
			<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
			<div style={{ display: 'flex', flexDirection: 'column', padding: 24, boxSizing: 'border-box', width: '100%' }}>
				<div>
					<IconButton
						onClick={menuClick}
            			sx={{ display: { sm: 'none' } }}
						color="secondary"
						component="span"
						style={{ margin: '-8px 0 8px -8px' }}>
						<MenuRoundedIcon />
					</IconButton>
					<Typography variant='h1' className={styles.pageTitle}>{routeName}</Typography>
				</div>

				<Route exact path="/" component={EditMainTT} />
				<Route exact path="/timetable" component={PageTimetable} />
				<Route exact path="/changes" component={EditMainTT} />
				<Route exact path="/autofill" component={EditMainTT} />
			</div>
		</div>
	)
  }