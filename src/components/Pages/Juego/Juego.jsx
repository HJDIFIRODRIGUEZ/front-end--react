import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, DialogContent, Paper, Divider, Button, ListItemAvatar, Avatar, TextField, DialogTitle } from '@mui/material'
import Page from '../../common/Page'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import './Style.css'




// ----------------------------------------------------------------------



const Juego = () => {

    return (
        <Page title="Helman | Pokemon">
            <Container maxWidth="xl">

                <section id="seleccionar-mascota">
                    <h1 class="titulo">Mokepono</h1>

                    <h2 class="subtitulo">Elige tu mascota:</h2>

                    <div id='contenedorTarjetas' class="tarjetas">

                    </div>

                    <button id="boton-mascota">Seleccionar</button>
                </section>

                <section id="ver-mapa">
                    <h2 class="subtitulo">Recorre el mapa con tu mokepon</h2>
                    <canvas id="mapa"></canvas>
                    <button onmouseup="detenerMovimiento()" onmousedown="moverArriba()">Arriba</button>
                    <div>
                        <button onmouseup="detenerMovimiento()" onmousedown="moverIzquierda()">Izquierda</button>
                        <button onmouseup="detenerMovimiento()" onmousedown="moverAbajo()">Abajo</button>
                        <button onmouseup="detenerMovimiento()" onmousedown="moverDerecha()">Derecha</button>
                    </div>
                </section>

                <section id="seleccionar-ataque">
                    <h1 class="titulo">Mokepon</h1>

                    <h2 class="subtitulo">Elige tu ataque:</h2>

                    <div id='contenedorAtaques' class="tarjetas-ataques">

                    </div>

                    <div id="mensajes">
                        <p id="resultado">Mucha suerte</p>

                        <section id="reiniciar">
                            <button id="boton-reiniciar">Reiniciar</button>
                        </section>
                    </div>

                    <div class="ataques">
                        <div class="ataques-jugador">
                            <p id="vidas-jugador">0</p>
                            <p id="mascota-jugador"></p>
                            <div id="ataques-del-jugador"></div>
                        </div>
                        <div class="ataques-enemigo">
                            <p id="vidas-enemigo">0</p>
                            <p id="mascota-enemigo"></p>
                            <div id="ataques-del-enemigo"></div>
                        </div>
                    </div>
                </section>

               

            </Container>
        </Page>
    )
}

export default Juego