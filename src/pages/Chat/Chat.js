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

const Chat = () => {
  const [userData, setUserData] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const { id, nome } = useUserContext();
  console.log("ID" + id + "Nome" + nome);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chats"));
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
  }, []);

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
    <div>
      <h1>Meu chatt - PICME</h1>
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
