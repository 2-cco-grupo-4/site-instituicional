import useStyles from "./CardBarLineChart.styles";
import { Box, Typography } from "@mui/material";
import BoxShadow from "atoms/BoxShadow/BoxShadow";
import {
  BarChart,
  Bar,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

const colors = ["#249ACF"];

const CardBarLineChart = ({ tituloPieChart, data, width, height }) => {
  const classes = useStyles();

  const jsonModelString = JSON.stringify(data[0]);
  const jsonModel = JSON.parse(jsonModelString);

  const keyName = Object.keys(jsonModel)[0];
  const valueName = Object.keys(jsonModel)[1];

  return (
    <BoxShadow
      width={width}
      height={height ? height : "auto"}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
        <ComposedChart
          data={data}
          margin={{
            top: 25,
            right: 25,
            left: 25,
            bottom: 25,
          }}
        >
          <XAxis dataKey={keyName} xAxisId={1} />
          <XAxis xAxisId={2} hide={true} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            xAxisId={1}
            radius={[10, 10, 0, 0]}
            dataKey={valueName == null ? 0 : valueName}
            fill={colors[0]}
            label={{ position: "top" }}
          />
          <Line
            xAxisId={2}
            strokeWidth={3}
            type="monotone"
            dataKey={valueName}
            stroke="#19CFA6"
            dot={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </BoxShadow>
  );
};

export default CardBarLineChart;
