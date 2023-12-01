import React from 'react'
import { PersonOutlined, HomeOutlined, MessageOutlined, ShoppingCart, GamepadOutlined } from '@mui/icons-material'

const sidebarConfig = [
	{
		title: 'inicio',
		path: '/app',
		icon: <HomeOutlined />
	},
	{
		title: 'Perfil',
		path: '/app/perfil',
		icon: <PersonOutlined />
	},
	{
		title: 'usuarios',
		path: '/app/usuarios',
		icon: <PersonOutlined />
	},
	{
		title: 'Usuarios login',
		path: '/app/users',
		icon: <PersonOutlined />
	},

	{
		title: ' Agregar Productos ',
		path: '/app/productos',
		icon: <ShoppingCart />
	},

	{
		title: 'Sala de chat',
		path: '/app/chat',
		icon: <MessageOutlined />
	},

	{
		title: 'Juego',
		path: '/app/juego',
		icon: <GamepadOutlined />
	}
]

export default sidebarConfig