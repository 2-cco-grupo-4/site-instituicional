import {
  Stack,
  Typography,
  Box,
  ImageListItem,
  ImageList,
  useTheme,
  Grid,
  OutlinedInput,
  Button,
} from "@mui/material";
import Container from "atoms/Container";
import React, { useState, useEffect, useRef } from "react";
import Header from "molecules/Header";
import IconSend from "@mui/icons-material/Send";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  addDoc,
  or,
  doc,
} from "firebase/firestore";
import db from "service/firebase";
import { useUserContext } from "contexts";
import useStyles from "./Chat.styles";
import ProfilePic from "atoms/ProfilePic";
import { DataObjectOutlined } from "@mui/icons-material";

const Chat = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [userChats, setUserChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [userChatName, setUserChatName] = useState("");

  const inputRef = useRef(null);

  const { id, nome, token } = useUserContext();
  const [userId] = useState(Number(id));

  const formatDatesChat = (data) => {
    const newChats = data;
    newChats.forEach((chat) => {
      const dataMensagem = new Date(chat.data_ultima_mensagem.seconds * 1000);
      const dataAtual = new Date();
      const dataOntem = new Date(dataAtual);
      dataOntem.setDate(dataOntem.getDate() - 1);

      const dataSemanaPassada = new Date(dataAtual);
      dataSemanaPassada.setDate(dataSemanaPassada.getDate() - 7);

      if (dataMensagem.getDate() === dataAtual.getDate()) {
        chat.data_ultima_mensagem = dataMensagem
          .toLocaleTimeString()
          .slice(0, 5);
      } else if (dataMensagem.getDate() === dataOntem.getDate()) {
        chat.data_ultima_mensagem = "ontem";
      } else if (
        dataMensagem.getDate() < dataOntem.getDate() &&
        dataMensagem.getDate() > dataSemanaPassada.getDate()
      ) {
        const daysOfWeek = [
          "domingo",
          "segunda-feira",
          "terça-feira",
          "quarta-feira",
          "quinta-feira",
          "sexta-feira",
          "sábado",
        ];
        chat.data_ultima_mensagem = daysOfWeek[dataMensagem.getDay()];
      } else {
        chat.data_ultima_mensagem = dataMensagem.toLocaleDateString();
      }
    });

    return newChats;
  };

  const formatDatesMensagem = (dataMensagens) => {
    const newMessages = dataMensagens;
    newMessages.forEach((mensagemAtual) => {
      let value = mensagemAtual.horario_envio.split(", ").map((current, i) => {
        let newValue = current.split(/\W/).map((x) => Number(x));
        if (i === 0) {
          newValue[1] -= 1;
          return newValue.reverse();
        }
        return newValue;
      });
      value = [...value[0], ...value[1]];

      const dataMensagem = new Date(...value);
      const dataAtual = new Date();

      if (dataMensagem.getDate() === dataAtual.getDate()) {
        mensagemAtual.horario_envio = dataMensagem
          .toLocaleTimeString()
          .slice(0, 5);
      } else {
        mensagemAtual.horario_envio = dataMensagem.toLocaleDateString();
      }
    });

    return newMessages;
  };

  const loadChats = async () => {
    try {
      const chatQuery = query(
        collection(db, "chats"),
        or(
          where("id_fotografo", "==", userId),
          where("id_contratante", "==", userId)
        ),
        orderBy("data_ultima_mensagem")
      );

      const querySnapshot = await getDocs(chatQuery);

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setUserChats(formatDatesChat(data));
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

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

      console.log(messagesData);
      setMessages(formatDatesMensagem(messagesData));
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  const handleChatClick = (chatId, userName) => {
    setSelectedChat(chatId);
    setUserChatName(userName);
    loadMessages(chatId);
  };

  const handleMessageSubmit = async () => {
    if (!selectedChat || !messageInput) return;

    const dataAtual = new Date();

    try {
      const docRef = await addDoc(
        collection(db, "chats", selectedChat, "mensagens"),
        {
          mensagem: messageInput,
          horario_envio: dataAtual,
          id_usuario: userId,
        }
      );

      await updateDoc(doc(db, "chats", selectedChat), {
        ultima_mensagem: messageInput,
        data_ultima_mensagem: dataAtual,
      });

      console.log("Mensagem enviada com ID: ", docRef.id);
      inputRef.current.value = "";
      setMessageInput("");
      loadMessages(selectedChat);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  useEffect(() => {
    loadChats();
  }, [id]);

  useEffect(() => {
    console.log(id);
    console.log(userChats);
  }, []);

  return (
    <Stack height="100dvh" sx={{ flexGrow: 1 }}>
      <Grid container height="100%" position="relative">
        <Grid item xs={3} md={4} className={classes.sidebar}>
          <Stack direction="column-reverse" className={classes.sidebarContent}>
            {userChats.map((chat) => {
              let nameChatUser =
                id === chat.id_contratante
                  ? chat.nome_fotografo
                  : chat.nome_contratante;
              return (
                <Stack
                  key={chat.id}
                  columnGap={2}
                  flexDirection="row"
                  alignItems="center"
                  className={classes.chatItem}
                  onClick={() => handleChatClick(chat.id, nameChatUser)}
                >
                  <ProfilePic
                    autor={nameChatUser}
                    alt={nameChatUser}
                    sx={{ width: theme.spacing(5), height: theme.spacing(5) }}
                  />
                  <Stack rowGap={1} className={classes.chatItemText}>
                    <Stack
                      columnGap={1}
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography noWrap variant="paragraph-medium-bold">
                        {nameChatUser}
                      </Typography>
                      <Typography
                        variant="paragraph-xsmall-regular"
                        align="right"
                      >
                        {chat.data_ultima_mensagem}
                      </Typography>
                    </Stack>
                    <Typography noWrap variant="paragraph-small-regular">
                      {chat.ultima_mensagem}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={9} md={8} className={classes.chatTextArea}>
          {selectedChat && (
            <Container
              py={4}
              minHeight="100dvh"
              flexDirection="column"
              justifyContent="flex-start"
              position="relative"
            >
              <Stack
                pb={4}
                sx={{
                  height: `calc(100% - ${inputRef?.current?.offsetHeight}px)`,
                }}
                flexDirection="column"
                justifyContent="flex-end"
                className={classes.messagesContainer}
              >
                {messages.map((content, index) => {
                  let isNextMessageFromUser;

                  if (
                    index < messages.length - 1 &&
                    messages[index + 1].id_usuario === content.id_usuario
                  ) {
                    isNextMessageFromUser = true;
                  } else {
                    isNextMessageFromUser = false;
                  }

                  return (
                    <Stack
                      key={index}
                      direction={
                        id == content.id_usuario ? "row" : "row-reverse"
                      }
                      width="100%"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      columnGap={1}
                      mb={isNextMessageFromUser ? 0.5 : 3}
                    >
                      {!isNextMessageFromUser && (
                        <Typography variant="paragraph-xsmall-regular">
                          {content.horario_envio}
                        </Typography>
                      )}
                      <Typography
                        sx={
                          id == content.id_usuario
                            ? {
                                width: "fit-content",
                                maxWidth: "60%",
                                color: theme.palette.white.main,
                                bgcolor: theme.palette.primary.main,
                                borderRadius: theme.shape.borderRadius,
                                borderBottomRightRadius: 1,
                                padding: theme.spacing(1, 2),
                                marginRight:
                                  isNextMessageFromUser && theme.spacing(5),
                              }
                            : {
                                width: "fit-content",
                                maxWidth: "60%",
                                bgcolor: theme.palette.whiteSoft.main,
                                borderRadius: theme.shape.borderRadius,
                                borderBottomLeftRadius: 1,
                                padding: theme.spacing(1, 2),
                                marginLeft:
                                  isNextMessageFromUser && theme.spacing(5),
                              }
                        }
                      >
                        {content.mensagem}
                      </Typography>
                      {isNextMessageFromUser || (
                        <ProfilePic
                          autor={id == content.id_usuario ? nome : userChatName}
                          sx={{
                            width: theme.spacing(4),
                            height: theme.spacing(4),
                            fontSize: theme.spacing(2),
                          }}
                        />
                      )}
                    </Stack>
                  );
                })}
              </Stack>
              <OutlinedInput
                multiline
                maxRows={5}
                placeholder="Digite uma mensagem..."
                fullWidth
                className={classes.inputMessage}
                inputRef={inputRef}
                onChange={(e) => setMessageInput(e.target.value)}
                sx={{ bgcolor: theme.palette.white.main }}
                endAdornment={
                  <Button
                    onClick={() => handleMessageSubmit()}
                    sx={{
                      fontSize: theme.spacing(2),
                      minWidth: 0,
                      padding: theme.spacing(1),
                      alignSelf: "flex-start",
                    }}
                    variant="contained"
                  >
                    <IconSend />
                  </Button>
                }
              />
            </Container>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Chat;
