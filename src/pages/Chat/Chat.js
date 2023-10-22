import React, { useState, useEffect } from "react";
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
import { FOTOGRAFO } from "service/fotografos";

const Chat = () => {
  const [userData, setUserData] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const { id, nome, tipoUsuario, token } = useUserContext();

  const [listarFotografo, setListarFotografo] = useState([{}]);

  const campoUser = tipoUsuario === 1 ? "id_cliente" : "id_fotografo";

  useEffect(() => {
    const loadChats = async () => {
      try {
        const chatQuery = query(
          collection(db, "chats"),
          where(campoUser, "==", id),
          orderBy("data_ultima_mensagem")
        );
        const querySnapshot = await getDocs(chatQuery);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setUserData(data);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        FOTOGRAFO.LISTAR(token).then((response) => {
          console.log("Teste listar fotografo", JSON.stringify(response.data));
          setListarFotografo(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div>
      <h2>Fotógrafos:</h2>
      <ul>
        {listarFotografo.map((fotografo) => (
          <li key={fotografo.id}>
            <button>{fotografo.nome}</button>
          </li>
        ))}
      </ul>
      <h1>Meu chat - PICME</h1>
      <ul>
        {userData.map((chat) => (
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
    </div>
  );
};

export default Chat;
