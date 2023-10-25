import React from "react";
import { Stack, Typography, Button, Avatar, Chip } from "@mui/material";
import Header from "molecules/Header";
import Footer from "molecules/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Calendario.css";
import ResponsiveDialog from "./Modal";
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
import { FOTOGRAFO } from "service/calendario";
import { useUserContext } from "contexts";

function Calendario(props) {
  const [events, setEvents] = useState([
    {
      id: 1,
      tema: "Casamento",
      cliente: "João",
      telefone: "123456789",
      start: "2023-10-10",
      endereco: "Rua 1",
      cidade: "São Paulo",
      bairro: "Centro",
      estado: "SP",
      complemento: "Casa",
      statusSessao: "Realizada",
      cep: "12345678",
      idFotografo: 1,
    },
    {
      id: 2,
      tema: "Casamento",
      cliente: "Lilian",
      telefone: "123456789",
      start: "2023-10-23",
      endereco: "Rua 2",
      cidade: "São Paulo",
      bairro: "Centro",
      estado: "SP",
      complemento: "Casa",
      statusSessao: "Realizada",
      cep: "12345678",
      idFotografo: 1,
    },
    {
      id: 2,
      tema: "Festa",
      cliente: "Maria",
      telefone: "123456789",
      start: "2023-10-03",
      endereco: "Rua 23",
      cidade: "São Paulo",
      bairro: "Centro",
      estado: "SP",
      complemento: "Casa",
      statusSessao: "Realizada",
      cep: "12345678",
      idFotografo: 1,
    },
  ]);

  const { id, nome, token } = useUserContext();
  const [open, setOpen] = useState(false);

  events.forEach((event) => {
    event.title = event.tema + " " + event.cliente;
  });

  const handleOpen = () => {
    console.log("Add evento");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const listarFotografo = async () => {
    FOTOGRAFO.LISTAR_EVENTOS(id, token).then((response) => {
      console.log(response.data);
      setEvents(response.data);
    });
  };

  useEffect(() => {
    listarFotografo();
  }, [token]);

  function validateJsonIsCalendarType(event) {
    return event == undefined;
  }

  function openModal(info) {
    const pophover = document.createElement("div");
    const modal = document.getElementById("modal");
    const boxModal = document.createElement("div");

    {
      if (validateJsonIsCalendarType(info.event)) {
        info.event = info;
        info.event.extendedProps = {};
        info.event.start = info.date;
        info.event.extendedProps.title = info.title;
        info.event.extendedProps.endereco = info.endereco;
        info.event.extendedProps.cliente = info.cliente;
        info.event.extendedProps.status = info.status;
      }
    }
    boxModal.innerHTMl = "";
    boxModal.classList.add("box-modal");
    boxModal.innerHTML = `
       
  
 
      <div class="box-title">
        <h2>${info.event.title}</h2>
        <p>${info.event.start.toLocaleDateString()}</p>
      </div>
      <div class="box-info">
        <div class="box-endereco">
          <h3>Endereço</h3>
          <p>${info.event.extendedProps.endereco}</p>
        </div>
        <div class="box-cliente">
          <h3>Cliente</h3>
          <p>${info.event.extendedProps.cliente}</p>
        </div>
        <div class="box-status">
          <h3>Status</h3>
          <p>${info.event.extendedProps.statusSessao}</p>
        </div>
      </div>
  
  
   
    `;

    pophover.appendChild(boxModal);
    modal.appendChild(pophover);

    pophover.addEventListener("click", function () {
      modal.removeChild(pophover);
    });
  }
  const customButtons = {
    customButton: {
      text: "Adicionar evento +",
      click: handleOpen,
    },
  };
  const header = { left: "title prev next", right: "customButton" };

  return (
    <>
      <Header type={3} />
      <Content>
        <div>{id}</div>
        <Card>
          <CardTitle>
            <Typography variant="h2">Agendamentos</Typography>
          </CardTitle>
          <CardBody>
            {events.map((event) => {
              return (
                <Agendamento
                  onClick={() => {
                    openModal(event);
                  }}
                >
                  <Icon></Icon>
                  <Dados>
                    <Typography variant="h4">{event.title}</Typography>
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
              info.el.addEventListener("click", function () {
                openModal(info);
              });
            }}
          />
          <ResponsiveDialog open={open} handleClose={handleClose} />
        </CalendarioDiv>
      </Content>
    </>
  );
}

export default Calendario;
