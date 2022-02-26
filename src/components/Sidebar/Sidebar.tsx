import * as React from 'react';
import { Box, ButtonBase, Drawer, SwipeableDrawer, Typography } from '@mui/material';
import styles from '../../style/base.module.css'
import SidebarItem from './SidebarItem';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AutoFillRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import TimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { useLocation } from 'react-router-dom';
import { ReactComponent as StatisticsIcon } from '../../icons/stat.svg';
import { TelegramLoginUser } from '../../schemas/TelegramLoginUser';

const drawerWidth = 240
interface ISidebarProps {
    open: boolean
    authUser: TelegramLoginUser
    setOpen: (value: boolean) => void
}

const Sidebar : React.FunctionComponent<ISidebarProps> = ({open, authUser, setOpen}) => {
    const widthStyle = {'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}
    const sidebarOpen = () => setOpen(true)
    const sidebarClose = () => setOpen(false)
    
    const route = useLocation().pathname;

	const drawerContent = <div className={styles.sidebarWrapper}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img src="/logo.svg" alt="Logo" className={styles.logo}/>
        <SidebarItem 
            title="Главная"
            icon={<HomeRoundedIcon/>}
            link="/"
            selected={route === "/"} />
        <SidebarItem 
            title="Расписание"
            icon={<TimeRoundedIcon/>}
            link="/timetable"
            selected={route === "/timetable"} />
        <SidebarItem 
            title="Изменения"
            icon={<ChangesRoundedIcon/>}
            link="/changes"
            selected={route === "/changes"} />
        <SidebarItem 
            title="Автозаполнение"
            icon={<AutoFillRoundedIcon/>}
            link="/autofill"
            selected={route === "/autofill"} />
        <SidebarItem 
            title="Статистика"
            icon={<StatisticsIcon/>}
            link="/statistics"
            selected={route === "/statistics"} />
            </div>

            <ButtonBase className={styles.sidebarItem}
            style={{ marginTop: 'auto' }}>
                <img src={authUser.photo_url} style={{
                    width: '24px',
                    borderRadius: '24px',
                }} />
                <Typography variant='caption'>{authUser.username}</Typography>
            </ButtonBase>
    </div>

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <SwipeableDrawer
                variant="temporary"
                open={open}
                onClose={sidebarClose}
                onOpen={sidebarOpen}
                ModalProps={{ keepMounted: true }}
                sx={{ ...widthStyle, display: { xs: 'block', sm: 'none' } }}>
                {drawerContent}
            </SwipeableDrawer>
            <Drawer
                variant="permanent"
                open 
                sx={{ ...widthStyle, display: { xs: 'none', sm: 'block' } }}>
                {drawerContent}
            </Drawer>
        </Box>
    )
}
export default Sidebar