import React, { useState, useEffect } from "react";
import firebase from "service/firebase";

const Chat = () => {
  const database = firebase.firestore();
  const collectionRef = database.collection("chats");

  const [data, setData] = useState([]);

  useEffect(() => {
    collectionRef
      .get()
      .then((querySnapshot) => {
        const newData = [];
        querySnapshot.forEach((doc) => {
          const chatData = doc.data();
          newData.push({ id: doc.id, data: chatData });
          console.log("Dados do chat:", chatData);
        });
        setData(newData);
      })
      .catch((error) => {
        console.error("Erro ao recuperar dados:", error);
      });
  }, []);

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.data.chat}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
