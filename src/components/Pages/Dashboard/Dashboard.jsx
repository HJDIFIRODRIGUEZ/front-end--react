import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, DialogContent, Paper, Divider, Button, ListItemAvatar, Avatar, TextField, DialogTitle } from '@mui/material'
import Page from '../../common/Page'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'


// ----------------------------------------------------------------------



const Dashboard = () => {

	return (
		<Page title="Helman | Dashboard">
			<Container maxWidth="xl">

				{/*
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Typography sx={{ mt: 3, fontWeight: 'bold' }} variant='h5'>Bienvenido a</Typography>
					<Typography sx={{ mt: 3, fontWeight: 'bold' }} variant='h2'>Helman Project</Typography>
				</Box>
				*/}

				<Grid container spacing={2}>
					{/*
					<Grid item xs={12} sm={12}>
						<img src='https://i.imgur.com/lMyNZPm.png' alt='...' style={{ position: 'absolute', width: '50%', height: 'auto', marginTop: 30 }} />
					</Grid>
					*/}


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
											label='Escribe tu mensaje'
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
											<Avatar />
											{/* 
										<Avatar src={user.picture} alt='...' />
										*/}
										</DialogTitle>
										<DialogTitle>
											<Typography variant="h5" color='primary' >nombre</Typography>
										</DialogTitle>
									</Grid>

								</Paper>

								<Divider></Divider>

								<Box>

									<Grid>

										<Paper>

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
													Comentario
												</Button>
											</Grid>
											<Grid item xs={4}>
												<Button
													fullWidth
													variant='contained'
													size='small'
													color='primary'

												>
													Compartir
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
						<div>
							<br></br>
						</div>

					</Container>





				</Grid>





			</Container>
		</Page>
	)
}

export default Dashboard