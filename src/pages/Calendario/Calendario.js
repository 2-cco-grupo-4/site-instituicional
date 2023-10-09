import React from "react";
import { Stack, Typography, Button, Avatar, Chip } from "@mui/material";
import Header from "molecules/Header";
import Footer from "molecules/Footer";
import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

function Calendario(props) {
  const events = [
    { title: "Agendamento com a rebeca", date: "2023-10-01" },
    { title: "event 2", date: "2023-10-02" },
  ];

  const header = { left: "title prev next", right: "" };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={header}
      events={events}
    />
  );
}

export default Calendario;
