import {Stack, Typography, Box } from "@mui/material";
import Container from "atoms/Container";
import React, { useState, useEffect } from "react";
import Header from "molecules/Header";
import useStyles from "./Chat.styles";
import iconSort from "assets/icons/🦆 icon _Alternate Sort Amount Down_.png";
import search from "assets/icons/Vector (1).png";


import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
} from "firebase/firestore";
import db from "service/firebase";
import { useUserContext } from "contexts";

const Chat = () => {
  const [userChats, setUserChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const { id, nome, tipoUsuario, token } = useUserContext();
  const userId = Number(id);

  const campoUser = tipoUsuario === "1" ? "id_cliente" : "id_fotografo";
  const campoUserOut = tipoUsuario === "1" ? "id_fotografo" : "id_cliente";

  const classes = useStyles();

  useEffect(() => {
    const loadChats = async () => {
      try {
        const chatQuery = query(
          collection(db, "chats"),
          where(campoUser, "==", userId),
          orderBy("data_ultima_mensagem")
        );
        const querySnapshot = await getDocs(chatQuery);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setUserChats(data);
      } catch (error) {
        console.error("Erro ao recuperar dados:", error);
      }
    };
    loadChats();
  }, [id]);

  const loadMessages = async (chatId) => {
    try {
      const messagesQuery = query(
        collection(db, "chats", chatId, "mensagens"),
        orderBy("horario_envio")
      );
      const messagesSnapshot = await getDocs(messagesQuery);
      const messagesData = [];
      messagesSnapshot.forEach((doc) => {
        const messageData = { id: doc.id, ...doc.data() };
        messageData.horario_envio = new Date(
          messageData.horario_envio.seconds * 1000
        ).toLocaleString();
        messagesData.push(messageData);
      });
      setMessages(messagesData);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  const handleChatClick = (chatId) => {
    setSelectedChat(chatId);
    loadMessages(chatId);
  };

  const handleMessageSubmit = async () => {
    if (!selectedChat || !messageInput) return;

    try {
      const docRef = await addDoc(
        collection(db, "chats", selectedChat, "mensagens"),
        {
          mensagem: messageInput,
          horario_envio: new Date(),
          id_usuario: id,
        }
      );
      console.log("Mensagem enviada com ID: ", docRef.id);
      setMessageInput("");
      loadMessages(selectedChat);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <Stack sx={{ transition: "2s all ease" }}>
      <Header type={2} />
      <Stack sx={{display: "flex", flexDirection: "row"}}>
        <Stack sx={{maxWidth: "30%"}}>
          <Container sx={{width: "300px"}} className={classes.conversation}>
            <img src={iconSort} alt=""></img>
            <Typography>Conversas</Typography>
            <img src={search} alt=""></img>
          </Container>

          <Container className={classes.boxChat}>
            <Stack className={classes.fotoPerfil}></Stack>
          </Container>
        </Stack>
        <Container className={classes.sectionTwo}>

        </Container>
      </Stack>

      {/* <div>
        <h1>Meu chat - PICME</h1>
        <ul>
          {userChats.map((chat) => (
            <li key={chat.id} onClick={() => handleChatClick(chat.id)}>
              {chat.nome_cliente}
            </li>
          ))}
        </ul>
        {selectedChat && (
          <div>
            <h2>Mensagens:</h2>
            <ul>
              {messages.map((message) => (
                <li key={message.id}>
                  {message.mensagem} - {message.horario_envio}
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Digite sua mensagem"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={handleMessageSubmit}>Enviar</button>
          </div>
        )}
      </div> */}
    </Stack>
  );
};

export default Chat;
