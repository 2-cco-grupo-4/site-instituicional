import { styled } from "@mui/system";
import { Typography } from "@mui/material";

export const CalendarioDiv = styled("div")`
  width:55%;
  height:100%;
`;

export const Content = styled("div")`
  display:flex;
  height:100%;
  width:100%;
  justify-content: space-evenly;
  justify-items:center;
  align-items:center;
  margin-top: 20px;
  padding-right:2%;
  padding-bottom: 4%; 

`;

export const Card = styled("div")`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 25%;
`;

export const CardTitle = styled("div")`
  border-bottom: 1px solid rgba(0,0,0,0.2);
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

export const CardBody = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: #D9D9D9;
  padding:20px;
  overflow-y: auto;
  max-height: 50vh;

  
`;

export const Agendamento = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding:20px;
  background-color: #fff; 
  border-radius: 10px;

`;

export const Icon = styled("div")`
  background-color: #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

export const Dados = styled("div")`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 180vh;
`;


export const Box = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const Pophover = styled("div")`
  position: absolute;
  width: 600px;
  background-color: #fff;
  border: 1px solid #000;
  padding: 10px;
  z-index: 1000;
  color: #000;
`;
