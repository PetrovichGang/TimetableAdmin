import EditMainTT from "./pages/EditMainTT"
import { Route, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar"
import { CircularProgress, Container, IconButton, Typography } from "@mui/material";
import styles from './style/base.module.css'
import { useEffect, useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PageTimetable from "./pages/PageTimetable";
import PageStatistics from "./pages/PageStatistics";
import PageLogin from "./pages/PageLogin";
import { TelegramLoginUser } from "./schemas/TelegramLoginUser";
import API_URL from "./config";

const routeNames: any = {
	'/timetable': 'Расписание',
	'/changes': 'Изменения',
	'/autofill': 'Автозамена',
	'/statistics': 'Статистика',
};


export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
    const menuClick = () => setSidebarOpen(true)
    const routeName = routeNames[useLocation().pathname] || 'Главная';
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null as (string | null))
	const [authUser, setAuthUser] = useState(null as (TelegramLoginUser | null))

    useEffect(() => {
		if (authUser == null)
        fetch(`${API_URL}/auth/info`, { credentials: 'include' })
			.then(i => i.json())
			.then((result) => {
				if (!("detail" in result)) {
					setAuthUser(result as TelegramLoginUser)
				}
				setLoading(false)
			})
	})

	return loading ?
	<div style={{ height: '100vh',
	display: 'flex',
	background: 'url("bg.svg") 0px center / 216px, linear-gradient(135deg, rgb(255, 255, 255), rgb(221, 224, 234))',
	justifyContent: 'center',
	alignItems: 'center' }}><CircularProgress /></div>
		
	: (authUser != null ? (
		<div className={styles.bg} style={{ display: 'flex' }}>
			<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} authUser={authUser} />
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
	) : <PageLogin setAuthUser={setAuthUser} />)
  }