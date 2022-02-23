import * as React from 'react'
import { ButtonBase, Typography } from '@mui/material'
import { Link } from "react-router-dom";
import styles from '../../style/base.module.css'

interface ISidebarItemProps {
    title: string
    icon: React.ReactNode
    link: string
    selected: boolean
}

const SidebarItem : React.FunctionComponent<ISidebarItemProps> = ({title, icon, link, selected}) => {
    
    return (
        <Link to={link} className={styles.sidebarLink}>
            <ButtonBase className={`${styles.sidebarItem} ${selected ? styles.selected : ''}`}>
                {icon}
                <Typography variant='caption'>{title}</Typography>
            </ButtonBase>
        </Link>
    )
}

export default SidebarItem