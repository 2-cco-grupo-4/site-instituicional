import { useEffect, useState } from "react";
import useStyles from "./ListarFotografoTeste.styles";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "service/firebase";
import { useUserContext } from "contexts";
import { FOTOGRAFO } from "service/fotografos";

const ListarFotografoTeste = () => {
  const classes = useStyles();

  const [listarFotografo, setListarFotografo] = useState([{}]);
  const { id, nome, tipoUsuario, token } = useUserContext();

  const idCliente = Number(id);

  const handleChatButtonClick = async (fotografo) => {
    try {
      const chatRef = await addDoc(collection(db, "chats"), {
        id_cliente: idCliente,
        id_fotografo: fotografo.id,
        nome_cliente: nome,
        nome_fotografo: fotografo.nome,
        data_ultima_mensagem: new Date(),
      });

      const chatId = chatRef.id;

      await addDoc(collection(db, "chats", chatId, "mensagens"), {
        mensagem: "Muito obrigado por estabelecermos o contrato! Estou ansioso para trabalhar com você e criar momentos especiais juntos. Se você tiver alguma dúvida ou precisar de alguma assistência, por favor, não hesite em perguntar. Vamos tornar este projeto incrível!",
        horario_envio: new Date(),
        id_usuario: idCliente,
      });

      const chatDoc = doc(db, 'chats', chatId);
      await updateDoc(chatDoc, {
        ultima_mensagem: "Muito obrigado por estabelecermos o contrato! Estou ansioso para trabalhar com você e criar momentos especiais juntos. Se você tiver alguma dúvida ou precisar de alguma assistência, por favor, não hesite em perguntar. Vamos tornar este projeto incrível!",
      });
    } catch (error) {
      console.log("Erro ao criar o chat: " + error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        FOTOGRAFO.LISTAR(token).then((response) => {
          console.log(
            "Teste listar fotografos: " + JSON.stringify(response.data)
          );
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
      <h1>Lista de Fotografos:</h1>
      <ul>
        {listarFotografo.map((fotografo) => (
          <li key={fotografo.id}>
            <button onClick={() => handleChatButtonClick(fotografo)}>{fotografo.nome}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarFotografoTeste;