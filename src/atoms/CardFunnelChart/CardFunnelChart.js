import useStyles from "./CardFunnelChart.styles";
import { Box, Typography, colors } from "@mui/material";
import BoxShadow from "atoms/BoxShadow/BoxShadow";
import {
  FunnelChart,
  ResponsiveContainer,
  Tooltip,
  Funnel,
  LabelList,
} from "recharts";

const CardFunnelChart = ({ tituloPieChart, data, width }) => {
  const classes = useStyles();

  // Verificar se data é um array e não está vazio
  if (!Array.isArray(data) || data.length === 0) {
    // Lidar com o caso em que data não é um array ou está vazio
    return (
      <BoxShadow width={width} height="auto">
        <Typography
          fontSize="16px"
          color="black"
          fontFamily="Inter"
          fontWeight="bold"
          paddingTop="20px"
        >
          {tituloPieChart}
        </Typography>
        <Typography>Data inválida</Typography>
      </BoxShadow>
    );
  }

  const jsonModelString = JSON.stringify(data[0] ? data[0] : [{}]);
  const jsonModel = JSON.parse(jsonModelString);

  const keyName = Object.keys(jsonModel)[0];
  const valueName = Object.keys(jsonModel)[1];

  const colors = ["#B0C3D0", "#98C1D1", "#71B6D0", "#55A4D1", "#2398CF"];

  const convertedData = data.map((item, index) => ({
    value: item.quantidade,
    name: `${item.statusSessao}: ${item.quantidade}`,
    fill: colors[index],
  }));

  const exemplo = [
    {
      value: 100,
      name: "Sessões",
      fill: "#B0C3D0",
    },
    {
      value: 80,
      name: "Sessões",
      fill: "#98C1D1",
    },
    {
      value: 60,
      name: "Sessões",
      fill: "#71B6D0",
    },
  ];

  console.log(JSON.stringify(convertedData));

  return (
    <BoxShadow width={width} height="auto">
      <Typography
        fontSize="16px"
        color="black"
        fontFamily="Inter"
        fontWeight="bold"
        paddingTop="20px"
      >
        {tituloPieChart}
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <FunnelChart
          width="100%"
          height={400}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Tooltip />
          <Funnel
            dataKey="value"
            lastShapeType="rectangle"
            data={convertedData}
            isAnimationActive
          >
            <LabelList
              position="center"
              fill="#000"
              stroke="black"
              dataKey="name"
              fontVariant="bold"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </BoxShadow>
  );
};

export default CardFunnelChart;
