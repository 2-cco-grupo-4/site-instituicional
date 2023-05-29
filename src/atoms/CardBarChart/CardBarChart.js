import useStyles from "./CardBarChart.styles"
import { Box, Typography } from "@mui/material"
import BoxShadow from "atoms/BoxShadow/BoxShadow";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  const colors = [
    '#249ACF'
  ]

const CardBarChart = ({tituloPieChart, data, width}) => {
    const classes = useStyles()

    const jsonModelString = JSON.stringify(data[0])
    const jsonModel = JSON.parse(jsonModelString)


    const keyName = Object.keys(jsonModel)[0]
    const valueName = Object.keys(jsonModel)[1]

  return (
    <BoxShadow
        width={width}
        height="auto"
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
            <BarChart
            data={data}
            margin={{
                top: 25,
                right: 100,
                left: 100,
                bottom: 25,
            }}
            >
                <XAxis dataKey={keyName} />
                <Tooltip />
                <Legend />
                <Bar radius={[10, 10, 0, 0]} dataKey={valueName} fill={colors[0]} label={{ position: 'top' }} />
            </BarChart>
      </ResponsiveContainer>

    </BoxShadow>
  )
}

export default CardBarChart