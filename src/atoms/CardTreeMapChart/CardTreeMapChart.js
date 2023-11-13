import useStyles from "./CardTreeMapChart.styles";
import { Box, Typography } from "@mui/material";
import BoxShadow from "atoms/BoxShadow";
import {
  Treemap,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = ["#249ACF"];

const CardTreeMapChart = ({ tituloPieChart, data, width }) => {
  const classes = useStyles();

  const jsonModelString = JSON.stringify(data[0] ? data[0] : [{}]);
  const jsonModel = JSON.parse(jsonModelString);

  const keyName = Object.keys(jsonModel)[0];
  const valueName1 = Object.keys(jsonModel)[1];
  const valueName2 = Object.keys(jsonModel)[2];

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

      <ResponsiveContainer width="95%" height={400}>
        <Treemap
          data={data}
          margin={{
            top: 50,
            right: 50,
            left: 50,
            bottom: 50,
          }}
          aspectRatio={1}
          link={{ stroke: '#000000' }}
        >
          <Legend />
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </BoxShadow>
  );
}

export default CardTreeMapChart;