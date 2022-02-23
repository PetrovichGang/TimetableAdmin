import { useState, useEffect } from 'react'
import { Typography, Box, Button, LinearProgress, TextField, Container, Card } from '@mui/material'
import styles from '../style/base.module.css'
import EditTimetableDialog from '../components/Table/EditTimetableDialog';
import API_URL from '../config';
import { ReactComponent as LoginAnimation } from '../icons/login.svg';

const PageLogin: React.FunctionComponent = () => {

	return (
		<div style={{ display: 'flex', background: 'url(bg.svg)', backgroundSize: '256px' }}>
			<Container maxWidth="xs" style={{ padding: 0 }}>
        <Box sx={{ height: '100vh',padding: '24px', background: '#efefef' }}>
				<LoginAnimation  style={{ width: '100%', padding: '15vh 0 16px' }}/>
				<Box sx={{
					padding: '24px',  display: 'flex',
					borderRadius: '24px',
					flexDirection: 'column',
					gap: '16px' }}>
					{/*<div className={styles.inputWrap}>
						<label>Логин</label>
						<input className={styles.input} />
					</div>
					<div className={styles.inputWrap}>
						<label>Пароль</label>
						<input className={styles.input} />
				</div>*/}
				<TextField label="Логин" />
				<TextField label="Пароль" />

					<Button  variant="contained" disableElevation>Вход</Button>
				</Box>
			</Box>
      </Container>
		</div>
	)
}

export default PageLogin