import useStyles from "./CardTreeMapChart.styles";
import { Box, Typography } from "@mui/material";
import BoxShadow from "atoms/BoxShadow";
import { Treemap, Tooltip, Legend, ResponsiveContainer } from "recharts";

const colors = ["#249ACF"];

const CardTreeMapChart = ({ tituloPieChart, data, width }) => {
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
        <Typography>Dados Insuficientes</Typography>
      </BoxShadow>
    );
  }

  const jsonModelString = JSON.stringify(data[0] ? data[0] : [{}]);
  const jsonModel = JSON.parse(jsonModelString);

  const keyName = Object.keys(jsonModel)[0];
  const valueName1 = Object.keys(jsonModel)[1];
  const valueName2 = Object.keys(jsonModel)[2];

  const converterTreeMap = data.map((item) => ({
    name: item.tema,
    value: item.sessoes,
  }));

  return (
    <BoxShadow width={width} height="auto">
      <Typography
        fontSize="16px"
        color="black"
        fontFamily="Inter"
        fontWeight="bold"
        paddingTop="20px"
        paddingBottom="20px"
      >
        {tituloPieChart}
      </Typography>

      <ResponsiveContainer
        width="90%"
        height={400}
        style={{ paddingBottom: "20px !important" }}
      >
        <Treemap
          data={converterTreeMap}
          margin={{
            top: 50,
            right: 50,
            left: 50,
            bottom: 50,
          }}
          aspectRatio={1}
          link={{ stroke: "#000000" }}
        >
          <Legend />
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </BoxShadow>
  );
};

export default CardTreeMapChart;
