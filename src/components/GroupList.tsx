import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'

interface IGroupListProps {
    groupList: string[]
    groupSelected: string
    onSelect: (group: any) => void
}

interface IGroupItemProps {
    group: string
    selected: boolean
    onSelect: (group: any) => void
}

const GroupItem : React.FunctionComponent<IGroupItemProps> = ({ group, selected, onSelect }) => {
    const handleClick = () => onSelect(group)
    return (
        <ListItemButton onClick={handleClick} selected={ selected }>
            <ListItemIcon>
                    <GroupOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary={group} />
        </ListItemButton>
    )
}

const GroupList : React.FunctionComponent<IGroupListProps> = ({ groupList, groupSelected, onSelect }) => {
    return (
        <List>
            { groupList.map(group => 
                <GroupItem key={group} group={group} onSelect={onSelect} selected={ groupSelected === group } />
            ) }
        </List>
    )
}

export default GroupList