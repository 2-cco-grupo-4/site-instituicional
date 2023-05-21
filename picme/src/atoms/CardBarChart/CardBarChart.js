import useStyles from "./CardBarChart.styles"
import { Box, Typography } from "@mui/material"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  const colors = [
    '#249ACF'
  ]

const CardBarChart = ({tituloPieChart, data}) => {
  const classes = useStyles()

  const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" fontWeight="bold" fontFamily="Inter" fontSize="16px" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

  return (
    <Box className={classes.caixa}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
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

        
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 25,
            right: 100,
            left: 100,
            bottom: 25,
          }}
        >
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          <Legend />
          <Bar radius={[10, 10, 0, 0]} dataKey="Contatos" fill={colors[0]} label={{ position: 'top' }} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default CardBarChart