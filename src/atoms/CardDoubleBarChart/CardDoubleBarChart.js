import useStyles from "./CardDoubleBarChart.styles";
import { Box, Typography } from "@mui/material";
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
} from "recharts";

const colors = ["#249ACF"];

const CardDoubleBarChart = ({ tituloPieChart, data, width }) => {
  const classes = useStyles();

  const jsonModelString = JSON.stringify(data[0] ? data[0] : [{}]);
  const jsonModel = JSON.parse(jsonModelString);

  const keyName = Object.keys(jsonModel)[0];
  const valueName1 = Object.keys(jsonModel)[1];
  const valueName2 = Object.keys(jsonModel)[2];

  data = data.slice(0, 5).map((item) => ({
    [keyName]: item[keyName],
    [valueName1]: item[valueName1],
    [valueName2]: item[valueName2],
  }));

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
          data={data}
          margin={{
            top: 25,
            right: 25,
            left: 25,
            bottom: 25,
          }}
        >
          <XAxis dataKey={keyName} />
          <Tooltip />
          <Legend />
          {/* <Bar
            radius={[5, 5, 0, 0]}
            dataKey={valueName1}
            fill={colors[0]}
            label={{ position: "top" }}
          /> */}
          <Bar
            radius={[5, 5, 0, 0]}
            dataKey={valueName2}
            fill={colors[0]}
            label={{ position: "top" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </BoxShadow>
  );
};

export default CardDoubleBarChart;
