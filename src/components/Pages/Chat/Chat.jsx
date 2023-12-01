import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider, Paper } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
//import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import io from 'socket.io-client';
import { AlignHorizontalRight } from '@mui/icons-material'

const socket = io('http://localhost:5000')

const Chat = () => {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    // Listen for incoming messages and add them to our state array

    const handleSubmit = (e) => {
        e.preventDefault()

        const newMessage = {
            body: message,
            from: "Me"
        
        }

        setMessages([...messages, newMessage])
        socket.emit('message', message)
        setMessage('')
    }

    useEffect(() => {
        socket.on('message', receiveMessage)

        return () => {
            socket.off("message", receiveMessage)
        }

    }, [])


    const receiveMessage = message => setMessages((state) => [...state, message])



    return (
        <>

            <Page title="Helman | Sala de Chat">

                <Container maxWidth='lg'>

                    <Container maxWidth="sm">
                        <Typography variant="h4" color='primary'> Sala de chat </Typography>
                    </Container>

                    {/* encapsular los elementos en las cajas es mejor para los elementos html */}
                    <Box>

                        <Paper elevation={3} style={{ padding: '5%' }}>

                            <Paper>

                                <Grid container spacing={2}>
                                    <DialogTitle>
                                        <Typography variant="h5" color='primary' >Chat</Typography>
                                    </DialogTitle>
                                </Grid>

                            </Paper>

                            <Divider></Divider>

                            <Box style={{ maxHeight: '400px', overflowY: 'auto'}}>

                                <Grid>

                                    <Paper style={{ padding: '10%', margin: '2px'  }}>

                                        <ul>
                                            <li>
                                                {messages.map((message, i) => (
                                                    <p key={i}><Avatar /> {message.from}  : {message.body}</p>
                                                ))}
                                            </li>
                                            
                                        </ul>

                                    </Paper>


                                </Grid>

                            </Box>

                            <Paper style={{ position: 'static' }}>
                                <DialogContent>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={9}>
                                                {/* Input field for typing the message */}
                                                <TextField
                                                    fullWidth
                                                    variant='outlined'
                                                    size='big'
                                                    color='primary'
                                                    label='Escribe tu mensaje'
                                                    name='username'
                                                    value={message}
                                                    onChange={(e) => { setMessage(e.target.value) }}


                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                {/* Button to send the message */}
                                                <Button
                                                    fullWidth
                                                    variant='contained'
                                                    size='big'
                                                    color='primary'
                                                    type="submit"
                                                >
                                                    Enviar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </DialogContent>
                            </Paper>
                        </Paper>

                    </Box>


                </Container>
                <br />

            </Page>





        </>
    )
}

export default Chat

