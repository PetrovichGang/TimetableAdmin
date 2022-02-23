import EditMainTT from "./pages/EditMainTT"
import { Route, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar"
import { IconButton, Typography } from "@mui/material";
import styles from './style/base.module.css'
import { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PageTimetable from "./pages/PageTimetable";
import PageStatistics from "./pages/PageStatistics";
import PageLogin from "./pages/PageLogin";

const routeNames: any = {
	'/timetable': 'Расписание',
	'/changes': 'Изменения',
	'/autofill': 'Автозамена',
	'/statistics': 'Статистика',
};

const login = !false

export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
    const menuClick = () => setSidebarOpen(true)
    const routeName = routeNames[useLocation().pathname] || 'Главная';
	return login ? (
		<div className={styles.bg} style={{ display: 'flex' }}>
			<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
			<div className={styles.content}>
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
				<Route exact path="/statistics" component={PageStatistics} />
			</div>
		</div>
	) : <PageLogin />
  }