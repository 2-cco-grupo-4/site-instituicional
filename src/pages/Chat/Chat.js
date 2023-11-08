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
import iconSort from "assets/icons/🦆 icon _Alternate Sort Amount Down_.png"
import search from "assets/icons/Vector (1).png"
import backgroundPerfil from "assets/img/foto-perfil-fotografo.png"
import styles from "./Chat.module.css"
import chatIcon from "assets/icons/chat_FILL0_wght400_GRAD0_opsz24.svg"
import enviar from "assets/icons/enviar-mensagem.png"
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

const Chat = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [userChats, setUserChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const [userOutName, setUserOutName] = useState("")

  const { id, nome, tipoUsuario, token } = useUserContext()
  const [userId] = useState(Number(id))
  const [campoUser] = useState(
    tipoUsuario === "1" ? "id_cliente" : "id_fotografo"
  )

  useEffect(() => {
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
        setUserChats(data)
      } catch (error) {
        console.error("Erro ao recuperar dados:", error)
      }
    }
    loadChats()
  }, [id])

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
      setMessages(messagesData)
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error)
    }
  }

  const handleChatClick = (chatId, userOutName) => {
    setSelectedChat(chatId)
    setUserOutName(userOutName)
    loadMessages(chatId)
  }

  const handleMessageSubmit = async () => {
    if (!selectedChat || !messageInput) return

    try {
      const docRef = await addDoc(
        collection(db, "chats", selectedChat, "mensagens"),
        {
          mensagem: messageInput,
          horario_envio: new Date(),
          id_usuario: userId,
        }
      )
      console.log("Mensagem enviada com ID: ", docRef.id)
      setMessageInput("")
      loadMessages(selectedChat)
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
    }
  }

  const refBody = useRef("")

  useEffect(() => {
    if (refBody.current.scrollHeight > refBody.current.offsetHeight) {
      refBody.current.scrollTop =
        refBody.current.scrollHeight - refBody.currentoffsetHeight
    }
  }, [messages])

  return (
    <Stack height="100dvh" sx={{ flexGrow: 1 }}>
      <Grid container height="100%" position="relative">
        <Grid item xs={4} className={classes.sidebar}>
          <Stack direction="column">
            <Stack columnGap={2} className={classes.chatItem}>
              <ProfilePic
                autor="Ryan Miyazato"
                alt="Ryan Miyazato"
                sx={{ width: theme.spacing(5), height: theme.spacing(5) }}
              />
              <Stack rowGap={1} className={classes.chatItemText}>
                <Typography noWrap variant="paragraph-medium-bold">
                  Ryan Miyazato
                </Typography>
                <Typography noWrap variant="paragraph-small-regular">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
              </Stack>
            </Stack>
            <Stack columnGap={2} className={classes.chatItem}>
              <ProfilePic
                autor="Danylo Dias"
                alt="Danylo Dias"
                sx={{ width: theme.spacing(6), height: theme.spacing(6) }}
              />
              <Stack rowGap={1} className={classes.chatItemText}>
                <Typography noWrap variant="paragraph-medium-bold">
                  Danylo Dias
                </Typography>
                <Typography noWrap variant="paragraph-small-regular">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={8} className={classes.chatTextArea}>
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
              <Stack
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
                  Olá, podemos agendar uma reunião para as 14:00? Assim, podemos
                  combinar melhor como faremos no dia do casamento.
                </Typography>
                <ProfilePic
                  autor="Ryan Miyazato"
                  sx={{
                    width: theme.spacing(4),
                    height: theme.spacing(4),
                    fontSize: theme.spacing(2),
                  }}
                />
              </Stack>
              <Stack
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
                    bgcolor: theme.palette.white.main,
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
              </Stack>
            </Stack>
            <OutlinedInput
              multiline
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
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Chat
