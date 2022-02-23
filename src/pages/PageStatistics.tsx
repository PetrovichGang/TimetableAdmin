import { useState, useEffect } from 'react'
import { Typography, Box, Card, CardContent } from '@mui/material'
import styles from '../style/pages.module.css'
import API_URL from '../config';
import { months, monthsTooltip, colors } from '../utils/charts';
import { StatisticsJSON } from '../schemas/StatisticsJSON';
import { Chart } from 'react-chartjs-2';
import { ChartData, registerables } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { TimeScale } from 'chart.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const PageStatistics: React.FunctionComponent = () => {
    const [stat, setStat] = useState(null as StatisticsJSON | null)
    const [dataUsers, setDataUsers] = useState(null as ChartData | null)
    const [dataGroups, setDataGroups] = useState(null as ChartData | null)

    const optionsUsers = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Рост пользователей бота в ВК' },
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: function (context) {
                        let label = (context[0].label || '').replaceAll(',', '');
                        let spl = label.split(' ')
                        spl[0] = monthsTooltip[spl[0]] ?? spl[0]
                        return `${spl[1]} ${spl[0]} ${spl[2]}`
                    }
                }
            }
        },
        interaction: { mode: 'index' as const, intersect: false },
        scales: {
            x: {
                type: 'time' as const,
                time: { unit: 'month' as const },
                ticks: {
                    callback: (label, index, labels) => {
                        let spl = label.split(' ')
                        spl[0] = months[spl[0]] ?? spl[0]
                        return spl.join(' ')
                    }
                }
            }
        }
    }

    const optionsGroups = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' as const },
            title: { display: true, text: 'Группы' }
        }
    }

    useEffect(() => {
        ChartJS.register(TimeScale, ...registerables)
        fetch(`${API_URL}/vk/statistics_all`)
            .then(res => res.json())
            .then(
                (result: StatisticsJSON) => {
                    setStat(result)

                    setDataUsers({
                        datasets: [
                            {
                                label: 'Пользователи',
                                backgroundColor: colors[4],
                                data: result.users.chart as any,
                                fill: true,
                            }
                        ]
                    })

                    setDataGroups({
                        labels: Object.keys(result.groups.chart),
                        datasets: [
                            {
                                label: 'Группы',
                                backgroundColor: colors,
                                data: Object.values(result.groups.chart)
                            }
                        ]
                    })
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    return (
        <Box className={styles.boxLineWrapStatistics} style={{ padding: '24px 0' }}>
            {dataUsers != null && <Card variant="elevation">
                <CardContent style={{ width: 'auto', height: '50vh' }}>
                    <Chart type='line' options={optionsUsers} data={dataUsers} />
                </CardContent>
            </Card>}
            <Box className={styles.boxLineWrap}>
                {dataGroups != null && <Card variant="outlined">
                    <CardContent style={{ width: 'auto', height: '360px' }}>
                        <Chart type='pie' options={optionsGroups} data={dataGroups} />
                    </CardContent>
                </Card>}
                {stat != null && (<Card variant="outlined">
                    <Typography variant='caption' style={{ margin: '14px 16px 0 16px' }} component="div">Группы</Typography>
                    <List dense={true} style={{ height: '360px', overflow: 'auto' }}>

                        {Object.entries(stat.groups.full).sort((x, y) => y[1] - x[1]).map(([group, count]) =>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={group + ": " + count} />
                                </ListItemButton>
                            </ListItem>
                        )}

                    </List>
                </Card>)}
                {stat != null && (<Card variant="outlined">
                    <Typography variant='caption' style={{ margin: '14px 16px 0 16px' }} component="div">Последние вступившие</Typography>
                    <List dense={true} style={{ height: '360px', overflow: 'auto' }}>

                        {stat.users.full.reverse().map(({ first_name, last_name, lesson_group, join, peer_id }) =>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <a href={"https://vk.com/id" + peer_id} target="_blank" rel="noopener noreferrer">
                                        <ListItemText primary={`${first_name} ${last_name} (${lesson_group ?? 'думает...'}) - ` + new Date(join * 1000).toLocaleDateString("ru-RU")} />

                                    </a></ListItemButton>
                            </ListItem>
                        )}

                    </List>
                </Card>)}
                {stat != null && (<Card variant="outlined" style={{ height: '100%' }}>
                    <Typography variant='caption' style={{ fontSize: '48px', margin: '4px 20px 0' }} component="div">{stat.users.count}</Typography>
                    <Typography variant='caption' style={{ margin: '0px 18px 18px' }} component="div">студента<br />используют бота</Typography>
                </Card>)}
            </Box>
        </Box>
    )
}

export default PageStatistics