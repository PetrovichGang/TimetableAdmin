import { useState, useEffect } from 'react'
import { Typography, Box, Button, LinearProgress, TextField, Container, Card } from '@mui/material'
import styles from '../style/base.module.css'
import API_URL from '../config';
import { ReactComponent as LoginAnimation } from '../icons/login.svg';
import TelegramLoginButton from 'react-telegram-login';
import { TelegramLoginUser } from '../schemas/TelegramLoginUser';

interface IPageLoginProps {
    setAuthUser: (value: TelegramLoginUser) => void
}

const PageLogin: React.FunctionComponent<IPageLoginProps> = ({ setAuthUser }) => {
	const handleTelegramLogin = user => {
		console.log(user)
		fetch(`${API_URL}/auth/telegram`,
			{
				headers: {
					'Content-Type': 'application/json'
				  },
				  credentials: 'include',
			method: 'POST',
			body: JSON.stringify(user)
		  })
			.then(res => res.json())
			.then(
				(result: { ok: boolean, user: TelegramLoginUser }) => {
					if (result.ok)
						setAuthUser(result.user)
				},
				(error) => {
					console.log(error)
				}
			)
	}

	return (
		<div style={{ display: 'flex', background: 'url(bg.svg) 0 / 216px, linear-gradient(135deg, rgb(255 255 255), rgb(221, 224, 234))' }}>
			<Container maxWidth="xs" style={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column' }}>
				<Box>
					<div style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center' }}>

						<LoginAnimation  style={{ width: '216px', margin: '-24px -8px -16px' }}/>
						<Typography variant="body2" color="#666">Админ-панель</Typography>
					</div>
					<Box className={styles.shadow} sx={{
						display: 'flex',
						flexDirection: 'column',
						padding: '24px',background: '#fff',
						borderRadius: '12px',
						gap: '16px' }}>
						<Typography variant="h2">Вход</Typography>

						<hr/>
							
						{/*<TextField label="Логин" />
						<TextField label="Пароль" />

						<Button  variant="contained" disableElevation>Вход</Button>
						<hr/>*/}
						<TelegramLoginButton
							botName="apt_timetable_bot"
							buttonSize="large"
							cornerRadius="4"
							widgetVersion="15"
							dataOnauth={handleTelegramLogin}  />
					</Box>
				</Box>
			</Container>
		</div>
	)
}

export default PageLogin