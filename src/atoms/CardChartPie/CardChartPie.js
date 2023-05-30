import { Box, Typography } from "@mui/material"
import { XAxis, YAxis, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useStyles from "./CardChartPie.styles"
import BoxShadow from "atoms/BoxShadow/BoxShadow";

  const colors = [
    '#249ACF',
    '#D74545'
  ]
      

const CardChartPie = ({tituloPieChart, value01, value02, label01, label02, width}) => {
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
    <BoxShadow
        width={width}
        height="auto"
    >
        <Typography
            fontSize="16px"
            color="black"
            fontWeight="bold"
            paddingTop="20px"
            textAlign="center"
        >
            {tituloPieChart}
        </Typography>


        <ResponsiveContainer width="100%" height={400}>
        
            <PieChart>
                <Legend layout="vertical" verticalAlign="middle" align="left" />
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={160} labelLine={false} label={renderCustomizedLabel}>
                    {data01.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} dataKey="teste" />
                    ))}
                    <XAxis dataKey="name" />
                    <YAxis />
                </Pie>
            </PieChart> 

        </ResponsiveContainer>
        
    </BoxShadow>
  )
}

export default CardChartPie