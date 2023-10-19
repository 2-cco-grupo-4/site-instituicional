import React from "react";
import { Stack, Typography, Button, Avatar, Chip } from "@mui/material";
import Header from "molecules/Header";
import Footer from "molecules/Footer";
import { useState } from "react";
import "./Calendario.css";
import {
  CalendarioDiv,
  Content,
  Card,
  CardTitle,
  CardBody,
  Agendamento,
  Icon,
  Dados,
  Box,
  Pophover,
} from "./Calendario.styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendario(props) {
  const events = [
    {
      tema: "Festa",
      cliente: "Rebeca Silva",
      endereco: "Avenida Paulista, Rua Haddock Lobo 851",
      date: "2023-10-01",
      horario: "10:00",
      status: "Ok",
    },
    {
      tema: "Casamento",
      cliente: "Jorge Dias",
      endereco:
        "São Paulo, São Paulo, Vila Mariana, Rua dos Patinhos feios, 52 ",
      date: "2023-10-07",
      horario: "12:00",
      status: "Wait",
    },
    {
      tema: "Churrasco",
      cliente: "João Matheus",
      endereco:
        "São Paulo, Guaianazes, Jardim São Paulo (Leste), Rua Dr José de Queiroz Aranha, 52",
      date: "2023-10-23",
      horario: "10:00",
      status: "Ok",
    },
  ];
  events.forEach((event) => {
    event.title = event.tema + " " + event.cliente;
  });

  const customButtons = {
    customButton: {
      text: "Adicionar evento +",
      click: function () {},
    },
  };
  const header = { left: "title prev next", right: "customButton" };

  return (
    <>
      <Header type={3} />
      <Content>
        <Card>
          <CardTitle>
            <Typography variant="h5">Agendamentos</Typography>
          </CardTitle>
          <CardBody>
            {events.map((event) => {
              return (
                <Agendamento>
                  <Icon></Icon>
                  <Dados>
                    <Typography variant="h5">{event.title}</Typography>
                    <Typography variant="subtitle1">{event.date}</Typography>
                  </Dados>
                </Agendamento>
              );
            })}
          </CardBody>
        </Card>
        <CalendarioDiv>
          <div id="modal"></div>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={header}
            customButtons={customButtons}
            events={events}
            aspectRatio={1.35}
            dayMaxEventRows={true}
            eventDidMount={function (info) {
              console.log(info.el);
              info.el.addEventListener("click", function () {
                const pophover = document.createElement("div");
                const modal = document.getElementById("modal");


                const boxModal = document.createElement("div");
                boxModal.innerHTMl = "";
                boxModal.classList.add("box-modal")
                boxModal.innerHTML = `
                   
                  <div class="box-title"> 
                    <h2> ${info.event.title} </h2>
                    <p> ${info.event.start.toLocaleDateString()} </p>  
                  </div> 
                  <div class="box-endereco"> 
                    <h3> Endereço </h3>
                    <p> ${info.event.extendedProps.endereco} </p>
                  </div>
                  <div class="box-cliente">
                    <h3> Cliente </h3>
                    <p> ${info.event.extendedProps.cliente} </p>
                  </div>
                  <div class="box-status"> 
                    <h3> Status </h3>
                    <p> ${info.event.extendedProps.status} </p>
                  </div>
               
                `;
              

                pophover.appendChild(boxModal);
                modal.appendChild(pophover);

                pophover.addEventListener("click", function () {
                  modal.removeChild(pophover);
                });
              });
            }}
          />
        </CalendarioDiv>
      </Content>
    </>
  );
}

export default Calendario;
