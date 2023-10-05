import useStyles from "./CardStackedBarChart.styles";
import { Typography } from "@mui/material";
import BoxShadow from "atoms/BoxShadow/BoxShadow";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CardStackedBarChart = ({ tituloPieChart, data, width }) => {
  const classes = useStyles();

  const jsonModelString = JSON.stringify(data[0]);
  const jsonModel = JSON.parse(jsonModelString);

  var keyName = Object.keys(jsonModel)[0];
  var valueName1 = Object.keys(jsonModel)[1];
  var valueName2 = Object.keys(jsonModel)[3];

  // Calcular as porcentagens totais e adicionar aos dados
  const dataWithPercentages = data.map((entry) => {
    const total = entry[valueName1] + entry[valueName2];
    const percentage = ((entry[valueName1] / total) * 100).toFixed(1) + "%";

    return {
      ...entry,
      percentage,
    };
  });

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
        <BarChart
          width="80%"
          height={500}
          data={dataWithPercentages}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis dataKey={keyName} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={valueName1} stackId="a" fill="#249ACF" color="#ffffff">
            <LabelList
              dataKey={valueName1}
              position="center"
              fill="white"
              fontWeight="bold"
            ></LabelList>
          </Bar>
          <Bar
            dataKey={valueName2}
            radius={[5, 5, 0, 0]}
            stackId="a"
            fill="#1E1E1E"
          >
            <LabelList
              dataKey={valueName2}
              position="center"
              fill="white"
              fontWeight="bold"
            ></LabelList>
            <LabelList
              position="top"
              fill="black"
              fontWeight="bold"
              dataKey="percentage"
            ></LabelList>
          </Bar>
          <Legend layout="vetical" verticalAlign="top" align="right" />
        </BarChart>
      </ResponsiveContainer>
    </BoxShadow>
  );
};

export default CardStackedBarChart;
