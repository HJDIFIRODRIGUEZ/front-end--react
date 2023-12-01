import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'

const Productos = () => {
	const initialState = {
		avatar: 'https://i.imgur.com/gh3fPj5.png'
	
	}
	const [productosList, setProductosList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

	const init = async () => {
		const { data } = await ApiRequest().get('/productos')
		setProductosList(data)
	}

 // esta es la funcion de la tabla productos

	const columns = [
		{ field: 'id', headerName: 'ID', width: 120 },

		{ field: 'producto', headerName: 'Prodiucto', width: 200 },
		{
			field: 'imgproducto',
			headerName: 'Imagen del producto',
			width: 200,
			renderCell: (params) => (
				<Avatar src={params.value} />
			)
		},
        { field: 'precio', headerName: 'Precio', width: 200 },
        { field: 'descripcion', headerName: 'Descripcion', width: 220 },
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

    // fin de  la funcion

    // funcion eliminar de la tabla productos

	const onDelete = async (id) => {
		try {
			const { data } = await ApiRequest().post('/eliminarproductos', { id: id })
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

    // fin de la funcion eliminar

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

   // funcion guardar de la tabla productos

	const onSubmit = async () => {
		try {
			const { data } = await ApiRequest().post('/guardar_producto', body)
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

    // fin de la funcion guardar

    // funcion editar de la tabla productos

	const onEdit = async () => {
		try {
			const { data } = await ApiRequest().post('/editarproductos', body)
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

    // fin de la funcion

	useEffect(init, [])

	return (
		<>
			<Dialog maxWidth='xs' open={openDialog} onClose={handleDialog}>
				<DialogTitle>
					{isEdit ? 'Editar Producto' : 'Crear Producto'}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<Avatar src={body.avatar} />
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='producto'
								value={body.producto}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Producto'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='imgproducto'
								value={body.imgproducto}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Url del producto'
							/>

						</Grid>

						<Grid item xs={12} sm={12}>
							<Button startIcon={<AddOutlined />} type='file' variant='contained' color='primary'>archivo</Button>
						</Grid>


                        <Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='precio'
								value={body.precio}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Precio del producto'
							/>
						</Grid>
                        <Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='descripcion'
								value={body.descripcion}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Descripcion'
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
					<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
				</DialogActions>
			</Dialog>
			<Page title="Helman | Productos">
				<ToastAutoHide message={mensaje} />
				<Container maxWidth='lg'>
					<Box sx={{ pb: 5 }}>
						<Typography variant="h5">Lista de productos</Typography>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='primary'>Nuevo Producto</Button>
						</Grid>
						<Grid item xs={12} sm={8} />
						<Grid item xs={12} sm={12}>
							<CommonTable data={productosList} columns={columns} />
						</Grid>
					</Grid>
				</Container>
			</Page>
		</>
	)
}

export default Productos

