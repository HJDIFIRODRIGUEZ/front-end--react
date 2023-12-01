import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider, Paper } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline, Padding } from '@mui/icons-material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'

const Users = () => {
	const initialState = {
		user: "",
		username: "",
		password: ""
	}
	const [usuariosList, setUsuariosList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

	const init = async () => {
		const { data } = await ApiRequest().get('/users')
		setUsuariosList(data)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 120 },

		{ field: 'user', headerName: 'Nombre', width: 220 },
		{ field: 'username', headerName: 'Nombre de usuario', width: 220 },
		{ field: 'password', headerName: 'Password', width: 220 },
		{
			field: '',
			headerName: 'Acciones',
			width: 200,
			renderCell: (params) => (
				<Stack divider direction='row' divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center" spacing={2}>
					<IconButton size='small' onClick={() => {
						setIsEdit(true)
						setBody(params.row)
						handleDialog()
					}}>
						<EditOutlined />
					</IconButton>
					<IconButton size='small' onClick={() => onDelete(params.id)}>
						<DeleteOutline />
					</IconButton>
				</Stack>
			)
		}
	]


	// eliminar funciona

	const onDelete = async (id) => {
		try {
			const { data } = await ApiRequest().post('/eliminarlogin', { id: id })
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	//fin eliminar

	const handleDialog = () => {
		setOpenDialog(prev => !prev)
	}

	const onChange = ({ target }) => {
		const { name, value } = target
		setBody({
			...body,
			[name]: value
		})
	}


	//guardar

	const onSubmit = async () => {
		try {
			const { data } = await ApiRequest().post('/guardarusers', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
			setIsEdit(false)
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	//fin guardar

	//editar

	const onEdit = async () => {
		try {
			const { data } = await ApiRequest().post('/editarusers', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	// fin editar

	useEffect(init, [])


	const styles = {
		container: {
			maxWidth: 'big',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		coverImage: {
			width: '100%',
			borderRadius: '1%',
			
		},
		profileImageContainer: {
			position: 'relative',
			marginTop: '-90px', // Ajusta la posición vertical según tu diseño
			marginBottom: '20px',
			width: '150px', // Ajusta el tamaño del círculo de la foto de perfil
			height: '150px',
			borderRadius: '50%',
			overflow: 'hidden',
		},
		profileImage: {
			width: '100%',
			height: '100%',
			objectFit: 'cover',
		},
	};

	return (
		<>


			<Dialog maxWidth='xs' open={openDialog} onClose={handleDialog}>
				<DialogTitle>
					{isEdit ? 'Editar Usuario' : 'Crear Usuario'}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>

						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='user'
								value={body.user}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Nombre'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='username'
								value={body.username}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='User name'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='password'
								value={body.password}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Password'
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
					<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
				</DialogActions>
			</Dialog>
			<Page title="Helman | Perfil">
				<ToastAutoHide message={mensaje} />

				<Container maxWidth='big' style={styles.container}>
					<Paper>
						<DialogContent>
							<div align="center">
								<img
									src='https://i.pinimg.com/originals/17/31/66/173166621a5416014ade859adc6a8533.png'
									alt='Foto de portada'
									style={styles.coverImage}
								/>
							</div>
						</DialogContent>
					</Paper>

					<div style={styles.profileImageContainer}>
						<img
							src='https://i.pinimg.com/originals/17/31/66/173166621a5416014ade859adc6a8533.png' // URL de la foto de perfil
							alt='Foto de perfil'
							style={styles.profileImage}
						/>

					</div>
					<div>
						<h2>juan estevan </h2>
						<h5>1000 Mil Amigos</h5>
					</div>

				</Container>

				<Container maxWidth='big'>
					<Paper>
						<DialogContent>
							<Grid container spacing={7} style={{ alignItems: 'center' }}>
								<Grid item xs={2}>
									<Button
										fullWidth
										variant='contained'
										size='small'
										color='primary'

									>
										<PersonOutlineOutlinedIcon />
										Publicaciones
									</Button>
								</Grid>
								<Grid item xs={2}>
									<Button
										fullWidth
										variant='contained'
										size='small'
										color='primary'
									>
										Informacion
									</Button>
								</Grid>
								<Grid item xs={1}>
									<Button
										fullWidth
										variant='contained'
										size='small'
										color='primary'

									>
										Amigos
									</Button>
								</Grid>
								<Grid item xs={1}>
									<Button
										fullWidth
										variant='contained'
										size='small'
										color='primary'

									>
										<PersonOutlineOutlinedIcon />
										Fotos
									</Button>
								</Grid>
								<Grid item xs={1}>
									<Button
										fullWidth
										variant='contained'
										size='small'
										color='primary'
									>
										Videos
									</Button>
								</Grid>
								<Grid item xs={1}>
									<Button
										fullWidth
										variant='contained'
										size='small'
										color='primary'

									>
										Reels
									</Button>
								</Grid>


							</Grid>
						</DialogContent>
					</Paper>
				</Container>

				<Container maxWidth='lg'>




					<Container maxWidth='lg'>
						<Divider></Divider>
						<Paper>
							<DialogContent>
								<Grid container spacing={2} alignItems="center">
									<Grid item xs={2}>
										{/* Input field for typing the message */}
										<Avatar></Avatar>
									</Grid>
									<Grid item xs={7}>
										{/* Input field for typing the message */}
										<TextField
											fullWidth
											variant='outlined'
											size='small'
											color='primary'
											label='Que estas pensando?'
											name='username'

										/>
									</Grid>
									<Grid item xs={3}>
										{/* Button to send the message */}
										<Button
											fullWidth
											variant='contained'
											size='big'
											color='primary'

										>
											Enviar
										</Button>
									</Grid>
								</Grid>
								<div>
									<br></br>
								</div>
								<Divider />
								<div>
									<br></br>
								</div>
								<Grid container spacing={3} style={{ alignItems: 'center' }}>
									<Grid item xs={4}>
										<Button
											fullWidth
											variant='contained'
											size='small'
											color='primary'

										>
											<PersonOutlineOutlinedIcon />
											Life
										</Button>
									</Grid>
									<Grid item xs={4}>
										<Button
											fullWidth
											variant='contained'
											size='small'
											color='primary'
										>
											Fotos/Videos
										</Button>
									</Grid>
									<Grid item xs={4}>
										<Button
											fullWidth
											variant='contained'
											size='small'
											color='primary'

										>
											Acontecimientos importantes
										</Button>
									</Grid>


								</Grid>
							</DialogContent>

						</Paper>

						<Divider></Divider>
						<div>
							<br></br>
						</div>
						{/* encapsular los elementos en las cajas es mejor para los elementos html */}
						<Box>

							<Paper elevation={3} style={{ padding: '5%' }}>

								<Paper>

									<Grid container spacing={2}>
										<DialogTitle>
											<Typography variant="h5" color='primary' >foto</Typography>
										</DialogTitle>
										<DialogTitle>
											<Typography variant="h5" color='primary' >nombre</Typography>
										</DialogTitle>
									</Grid>

								</Paper>

								<Divider></Divider>

								<Box>

									<Grid>

										<Paper >

											<div align="center">
												<img src='https://images5.alphacoders.com/132/1329226.jpeg' width='100%' style={{ borderRadius: '3%' }} />
											</div>

										</Paper>


									</Grid>

								</Box>

								<Paper>
									<DialogContent>
										<Grid container spacing={4} style={{ alignItems: 'center' }}>
											<Grid item xs={4}>
												<Button
													fullWidth
													variant='contained'
													size='small'
													color='primary'
												>
													Enviar
												</Button>
											</Grid>
											<Grid item xs='3'>

											</Grid>
											<Grid item xs={2}>
												<Button
													fullWidth
													variant='contained'
													size='small'
													color='primary'
												>
													E
												</Button>
											</Grid>
											<Grid item xs={1}>
												<Button
													fullWidth
													variant='contained'
													size='small'
													color='primary'
												>
													En
												</Button>
											</Grid>


										</Grid>
									</DialogContent>
								</Paper>

								<Divider></Divider>

								<Paper>
									<DialogContent>
										<Grid container spacing={4} style={{ alignItems: 'center' }}>
											<Grid item xs={4}>
												<Button
													fullWidth
													variant='contained'
													size='small'
													color='primary'

												>
													<PersonOutlineOutlinedIcon />
													Like
												</Button>
											</Grid>
											<Grid item xs={4}>
												<Button
													fullWidth
													variant='contained'
													size='small'
													color='primary'
												>
													Enviar
												</Button>
											</Grid>
											<Grid item xs={4}>
												<Button
													fullWidth
													variant='contained'
													size='small'
													color='primary'

												>
													Enviar
												</Button>
											</Grid>


										</Grid>
										<div>
											<br></br>
										</div>
										<Grid container spacing={2} alignItems="center">
											<Grid item xs={2}>
												{/* Input field for typing the message */}
												<Avatar></Avatar>
											</Grid>
											<Grid item xs={7}>
												{/* Input field for typing the message */}
												<TextField
													fullWidth
													variant='outlined'
													size='small'
													color='primary'
													label='Escribe tu comentario'
													name='username'

												/>
											</Grid>
											<Grid item xs={3}>
												{/* Button to send the message */}
												<Button
													fullWidth
													variant='contained'
													size='big'
													color='primary'

												>
													Enviar
												</Button>
											</Grid>
										</Grid>
									</DialogContent>

								</Paper>
							</Paper>

						</Box>


					</Container>


					<Box sx={{ pb: 5 }}>
						<Typography variant="h5">Lista de usuarios</Typography>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='primary'>Nuevo</Button>
						</Grid>
						<Grid item xs={12} sm={8} />
						<Grid item xs={12} sm={12}>
							<CommonTable data={usuariosList} columns={columns} />
						</Grid>
					</Grid>
				</Container>
			</Page>
		</>
	)
}

export default Users

