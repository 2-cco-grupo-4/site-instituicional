import { Box, Typography } from "@mui/material"
import { XAxis, YAxis, Legend, PieChart, Pie, Cell } from 'recharts';
import useStyles from "./CardChartPie.styles"

  const colors = [
    '#249ACF',
    '#000000'
  ]
      

const CardChartPie = ({tituloPieChart, value01, value02, label01, label02}) => {
  const classes = useStyles()

  const data01 = [
    {
      "name": label01,
      "value": value01
    },
    {
      "name": label02,
      "value": value02
    }
  ];

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

        
        <PieChart width={500} height={400}>
            <Legend layout="vertical" verticalAlign="middle" align="left" />
            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={160} labelLine={false} label={renderCustomizedLabel}>
                {data01.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} dataKey="teste" />
                ))}
                <XAxis dataKey="name" />
                <YAxis />
            </Pie>
        </PieChart> 
        
    </Box>
  )
}

export default CardChartPie