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
  const [events, setEvents] = useState([]);

  const { id, nome, token } = useUserContext();
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    console.log("Add evento");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const listarFotografo = async () => {
    FOTOGRAFO.LISTAR_EVENTOS(id, token).then((response) => {
      const updatedEvents = response.data.map((event) => {
        return {
          id: event.id,
          idCliente: event.cliente.id,
          idFotografo: event.fotografo.id,
          title: event.cliente.nome + " Evento",
          cliente: event.cliente.nome,
          start: event.dataRealizacao,
          endereco: `${event.endereco.estado}, ${event.endereco.cidade}, ${event.endereco.bairro}, ${event.endereco.rua}, ${event.endereco.numero} ${event.endereco.complemento == null ? "" : "," + event.endereco.complemento}`,
          cidade: event.endereco.cidade,
          bairro: event.endereco.bairro,
          estado: event.endereco.estado,
          complemento: event.endereco.complemento,
          cep: event.endereco.cep,
          numero: event.endereco.numero,
          statusSessao: event.statusSessao,
          cep: event.cep,
          dataRealizacao: event.dataRealizacao,
        };
      });
      setEvents(updatedEvents);
    });
  };

  useEffect(() => {
    listarFotografo();
  }, [token]);

  function validateJsonIsCalendarType(event) {
    return event == undefined;
  }

  let currentModal = null;

  function openModal(info, isAppointment) {

    if (currentModal) {
      closeModal(currentModal);
    }

    console.log(info)
    const pophover = document.createElement("div");
    const modal = document.getElementById("modal");
    const boxModal = document.createElement("div");

    boxModal.innerHTMl = "";
    boxModal.classList.add("box-modal");

    let title, date, endereco, cliente, status;

    if (isAppointment) {
      title = info.title;
      date = new Date(info.start);
      endereco = info.endereco;
      cliente = info.cliente;
      status = info.statusSessao;
    } else {
      let data = info.event._def.extendedProps;
      title = `${data.cliente} Evento`;
      date = new Date(data.dataRealizacao);
      endereco = data.endereco;
      cliente = data.cliente;
      status = data.statusSessao;
    }


    let dataDiv = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    let horaDiv = `${date.getHours()}:${date.getMinutes()}`;
    boxModal.innerHTML = `


    <div class="box-header">
    <div class="date">${dataDiv} ${horaDiv} </div>
    <div class="close">X</div>
  </div>

  <div class="box-body">
    <div class="box-body">
      <div class="box">
        <h1>${title}</h1>
      </div>

      <div class="box">
        <h3>Endereço</h3>
        <p>${endereco}</p>
      </div>

      <div class="box">
        <h3>Cliente</h3>
        <p>${cliente}</p>
      </div>

      <div class="box">
        <h3>Status</h3>
        <p>${status}</p>
      </div>
    </div>
  </div>


    `;

    pophover.appendChild(boxModal);
    modal.appendChild(pophover);

    pophover.addEventListener("click", function () {
      closeModal(pophover);
    });


    currentModal = pophover;
  }

  function closeModal(modal) {
    const parentModal = modal.parentNode;
    parentModal.removeChild(modal);
    currentModal = null;
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

        <Card>
          <CardTitle>
            <Typography variant="h2">Agendamentos</Typography>
          </CardTitle>
          <CardBody>
            {events.map((event) => {
              return (
                <Agendamento
                  onClick={() => {
                    openModal(event, true);
                  }}
                >

                  <Dados>
                    <Typography variant="h4">Evento de {event.cliente}</Typography>
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
                openModal(info, false);
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
