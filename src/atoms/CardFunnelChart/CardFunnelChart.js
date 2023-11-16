import useStyles from "./CardFunnelChart.styles";
import { Box, Typography } from "@mui/material";
import BoxShadow from "atoms/BoxShadow/BoxShadow";
import {
  FunnelChart,
  ResponsiveContainer,
  Tooltip,
  Funnel,
  LabelList
} from "recharts";

const CardFunnelChart = ({ tituloPieChart, data, width }) => {

  const classes = useStyles();

  const jsonModelString = JSON.stringify(data[0] ? data[0] : [{}]);
  const jsonModel = JSON.parse(jsonModelString);

  const keyName = Object.keys(jsonModel)[0];
  const valueName = Object.keys(jsonModel)[1];

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
          width={300}
          height={250}
          margin={{
            top: 5,
            right: 40,
            bottom: 15,
            left: 30
          }}>
          <Tooltip />
          <Funnel dataKey="value" lastShapeType="rectangle" data={data} isAnimationActive>
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
    </BoxShadow >
  );

};

export default CardFunnelChart;