import { Box, Typography } from "@mui/material"
import { XAxis, YAxis, Legend, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import useStyles from "./CardChartPie.styles"
import BoxShadow from "atoms/BoxShadow/BoxShadow";

  const colors = [
    '#249ACF',
    '#D74545'
  ]
      

const CardChartPie = ({tituloPieChart, data, width}) => {
  const classes = useStyles()

  const jsonModelString = JSON.stringify(data[0])
  const jsonModel = JSON.parse(jsonModelString)


  const keyName = Object.keys(jsonModel)[0]
  const valueName = Object.keys(jsonModel)[1]

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
            marginLeft={3}
            marginRight={3}
        >
            {tituloPieChart}
        </Typography>


        <ResponsiveContainer width="85%" height={400}>
        
            <PieChart>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="left" />
                <Pie data={data} dataKey={valueName} nameKey={keyName} cx="50%" cy="50%" outerRadius={120} labelLine={false} label={renderCustomizedLabel}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} dataKey={keyName} />
                    ))}
                    <XAxis dataKey={keyName} />
                    <YAxis />
                </Pie>
            </PieChart> 

        </ResponsiveContainer>
        
    </BoxShadow>
  )
}

export default CardChartPie