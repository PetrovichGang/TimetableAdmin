import * as React from 'react';
import { Box, Drawer, SwipeableDrawer } from '@material-ui/core';
import { useState } from 'react';
import styles from '../../style/base.module.css'
import SidebarItem from './SidebarItem';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AutoFillRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import TimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240
interface ISidebarProps {
    open: boolean
    setOpen: (value: boolean) => void
}

const Sidebar : React.FunctionComponent<ISidebarProps> = ({open, setOpen}) => {
    const widthStyle = {'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}
    const sidebarOpen = () => setOpen(true)
    const sidebarClose = () => setOpen(false)
    
    const route = useLocation().pathname;

	const drawerContent = <div className={styles.sidebarWrapper}>
        <img src="/logo.svg" className={styles.logo}/>
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