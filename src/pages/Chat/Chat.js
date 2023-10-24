import {
  Stack,
  Typography,
  Box,
  ImageListItem,
  ImageList,
} from "@mui/material";
import Container from "atoms/Container";
import React, { useState, useEffect } from "react";
import Header from "molecules/Header";
import useStyles from "./Chat.styles";
import iconSort from "assets/icons/🦆 icon _Alternate Sort Amount Down_.png";
import search from "assets/icons/Vector (1).png";
import backgroundPerfil from "assets/img/foto-perfil-fotografo.png";
import styles from "./Chat.module.css";
import chatIcon from "assets/icons/chat_FILL0_wght400_GRAD0_opsz24.svg";

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

  const chatDefault = selectedChat === null ? "block" : "none";

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

  console.log(userChats);

  return (
    <Stack sx={{ transition: "2s all ease" }}>
      <Header type={2} />
      <Stack sx={{ display: "flex", flexDirection: "row" }}>
        <Stack
          sx={{
            maxWidth: "30%",
            borderRight: "2px solid rgba(208, 208, 208, 2)",
          }}
        >
          <div className={styles.conversation}>
            <img src={iconSort} alt=""></img>
            <h3>Conversas</h3>
            <img src={search} alt=""></img>
          </div>

          <div className={styles.scroll}>
            {userChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className={styles.chatContainer}
              >
                <img src={backgroundPerfil} alt=""></img>
                <div>
                  <span className={styles.name}>
                    {tipoUsuario === "1"
                      ? chat.nome_fotografo
                      : chat.nome_cliente}
                  </span>
                  <span className={styles.message}>
                    {chat.ultima_mensagem.length > 80
                      ? chat.ultima_mensagem.substring?.(0, 50) + "..."
                      : chat.ultima_mensagem}
                  </span>
                  <span className={styles.horario}>
                    {new Date(
                      chat.data_ultima_mensagem.seconds * 1000
                    ).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Stack>
        <Stack
          sx={{
            width: "70%",
          }}
        >
          {selectedChat !== null ? (
            <div className={styles.messageContainer}>
              <div className={styles.messageHeader}>
                <div className={styles.perfil}>
                  <img src={backgroundPerfil} alt=""></img>
                  <span className={styles.nome}>
                    Nome da pessoa
                  </span>
                </div>
                <div className={styles.sessaoName}>
                  <span>Aqui fica o nome do Evento</span>
                </div>
                <div className={styles.detalhes}>
                  <span>Detalhes</span>
                </div>
              </div>
              <div className={styles.campoMensage}>
                {selectedChat && (
                  <div>
                    <div className={styles.chatMensagens}>
                      {messages.map((message) => (
                        <span key={message.id}>
                          {message.mensagem} - {message.horario_envio}
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Digite sua mensagem"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button onClick={handleMessageSubmit}>Enviar</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.messageDefault}>
              <img src={chatIcon} alt=""></img>
              <span className={styles.titleChat}>Picme - Chat</span>
              <span className={styles.titleChat}>
                Selecione um chat para aparecer as mensagens
              </span>
            </div>
          )}
        </Stack>
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
