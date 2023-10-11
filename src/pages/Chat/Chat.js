import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "service/firebase";

const Chat = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "chats")
        );
        const data = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          data.push({ id: doc.id, ...doc.data() });
        });
        setUserData(data);
      } catch (error) {
        console.error("Erro ao recuperar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Mensagens</h1>
      <ul>
        {userData.map((chat) => (
          <li key={chat.id}>{chat.nome_cliente}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
