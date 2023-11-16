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
} from "@mui/material"
import Container from "atoms/Container"
import React, { useState, useEffect, useRef } from "react"
import Header from "molecules/Header"
import IconSend from "@mui/icons-material/Send"

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
} from "firebase/firestore"
import db from "service/firebase"
import { useUserContext } from "contexts"
import useStyles from "./Chat.styles"
import ProfilePic from "atoms/ProfilePic"
import { DataObjectOutlined } from "@mui/icons-material"

const Chat = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [userChats, setUserChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const [userChatName, setUserChatName] = useState("")

  const { id, nome, tipoUsuario, token } = useUserContext()
  const [userId] = useState(Number(id))
  const [campoUser] = useState(
    tipoUsuario == 1 ? "id_cliente" : "id_fotografo"
  )

  const formatDatesChat = (data) => {
    const newChats = data
    newChats.forEach((chat) => {
      const dataMensagem = new Date(chat.data_ultima_mensagem.seconds * 1000)
      const dataAtual = new Date()
      const dataOntem = new Date(dataAtual)
      dataOntem.setDate(dataOntem.getDate() - 1)

      const dataSemanaPassada = new Date(dataAtual)
      dataSemanaPassada.setDate(dataSemanaPassada.getDate() - 7)


      if (dataMensagem.getDate() === dataAtual.getDate()) {
        chat.data_ultima_mensagem = dataMensagem.toLocaleTimeString().slice(0, 5)
      } else if (dataMensagem.getDate() === dataOntem.getDate()){
        chat.data_ultima_mensagem = "ontem"
      } else if (dataMensagem.getDate() < dataOntem.getDate() && dataMensagem.getDate() > dataSemanaPassada.getDate()) {
        const daysOfWeek = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
        chat.data_ultima_mensagem = daysOfWeek[dataMensagem.getDay()]
      }else{
        chat.data_ultima_mensagem = dataMensagem.toLocaleDateString()
      }
    })

    return newChats
  }

  const loadChats = async () => {
    try {
      const chatQuery = query(
        collection(db, "chats"),
        where(campoUser, "==", userId),
        orderBy("data_ultima_mensagem")
      )

      const querySnapshot = await getDocs(chatQuery)

      const data = []
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      })

      setUserChats(formatDatesChat(data))
    } catch (error) {
      console.error("Erro ao recuperar dados:", error)
    }
  }

  const loadMessages = async (chatId) => {
    try {
      const messagesQuery = query(
        collection(db, "chats", chatId, "mensagens"),
        orderBy("horario_envio")
      )
      const messagesSnapshot = await getDocs(messagesQuery)
      const messagesData = []
      messagesSnapshot.forEach((doc) => {
        const messageData = { id: doc.id, ...doc.data() }
        messageData.horario_envio = new Date(
          messageData.horario_envio.seconds * 1000
        ).toLocaleString()
        messagesData.push(messageData)
      })

      console.log(messagesData)
      setMessages(messagesData)
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error)
    }
  }

  const handleChatClick = (chatId, userName) => {
    setSelectedChat(chatId)
    setUserChatName(userName)
    loadMessages(chatId)
  }

  // const handleMessageSubmit = async () => {
  //   if (!selectedChat || !messageInput) return

  //   try {
  //     const docRef = await addDoc(
  //       collection(db, "chats", selectedChat, "mensagens"),
  //       {
  //         mensagem: messageInput,
  //         horario_envio: new Date(),
  //         id_usuario: userId,
  //       }
  //     )
  //     console.log("Mensagem enviada com ID: ", docRef.id)
  //     setMessageInput("")
  //     loadMessages(selectedChat)
  //   } catch (error) {
  //     console.error("Erro ao enviar mensagem:", error)
  //   }
  // }

  // const refBody = useRef("")

  // useEffect(() => {
  //   if (refBody.current.scrollHeight > refBody.current.offsetHeight) {
  //     refBody.current.scrollTop =
  //       refBody.current.scrollHeight - refBody.currentoffsetHeight
  //   }
  // }, [messages])

  useEffect(() => {
    setTimeout(() => {
      loadChats()
    }, 100)
  }, [id])


  return (
    <Stack height="100dvh" sx={{ flexGrow: 1 }}>
      <Grid container height="100%" position="relative">
        <Grid item xs={4} className={classes.sidebar}>
          <Stack direction="column-reverse">
            {userChats.map((chat) => (
              <Stack
                key={chat.id}
                columnGap={2}
                flexDirection="row"
                alignItems="center"
                className={classes.chatItem}
                onClick={() => handleChatClick(chat.id, chat.nome_fotografo)}
              >
                <ProfilePic
                  autor={chat.nome_fotografo}
                  alt={chat.nome_fotografo}
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
                      {chat.nome_fotografo}
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
            ))}
          </Stack>
        </Grid>
        <Grid item xs={8} className={classes.chatTextArea}>
          {selectedChat && (
            <Container
              pb={2}
              minHeight="100%"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <Stack
                pb={4}
                height="100%"
                flexDirection="column"
                justifyContent="flex-end"
                rowGap={3}
              >
                {messages.map((content, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    width="100%"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    columnGap={1}
                  >
                    <Typography
                      sx={{
                        width: "fit-content",
                        maxWidth: "60%",
                        color: theme.palette.white.main,
                        bgcolor: theme.palette.primary.main,
                        borderRadius: theme.shape.borderRadius,
                        borderBottomRightRadius: 1,
                        padding: theme.spacing(1, 2),
                      }}
                    >
                      {content.mensagem}
                    </Typography>
                    <ProfilePic
                      autor={id == content.id_usuario ? nome : userChatName }
                      sx={{
                        width: theme.spacing(4),
                        height: theme.spacing(4),
                        fontSize: theme.spacing(2),
                      }}
                    />
                  </Stack>
                ))}
                {/* <Stack
                  direction="row-reverse"
                  width="100%"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  columnGap={1}
                >
                  <Typography
                    sx={{
                      width: "fit-content",
                      maxWidth: "60%",
                      bgcolor: theme.palette.whiteSoft.main,
                      borderRadius: theme.shape.borderRadius,
                      borderBottomLeftRadius: 1,
                      padding: theme.spacing(1, 2),
                    }}
                  >
                    Claro! Te ligo pelo WhatsApp!
                  </Typography>
                  <ProfilePic
                    autor="Ryan Miyazato"
                    sx={{
                      width: theme.spacing(4),
                      height: theme.spacing(4),
                      fontSize: theme.spacing(2),
                    }}
                  />
                </Stack> */}
              </Stack>
              <OutlinedInput
                multiline
                maxRows={5}
                placeholder="Digite uma mensagem..."
                fullWidth
                sx={{ bgcolor: theme.palette.white.main }}
                endAdornment={
                  <Button
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
  )
}

export default Chat
