import useStyles from "./CardSanekyChart.styles";
import { Box, Typography } from "@mui/material";
import BoxShadow from "atoms/BoxShadow";
import {
  Sankey,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = ["#249ACF"];

const CardSankeyChart = ({ tituloPieChart, data, width }) => {
  const classes = useStyles();

  const jsonModelString = JSON.stringify(data[0] ? data[0] : [{}]);
  const jsonModel = JSON.parse(jsonModelString);

  const keyName = Object.keys(jsonModel)[0];

  let objetData = {
    "nodes": [
      {
        "name": "Proposta"
      },
      {
        "name": "Aceita"
      },
      {
        "name": "Em Negociação"
      },
      {
        "name": "Agendada"
      },
      {
        "name": "Realizada"
      }
    ],
    "links": []
  };
  

  if (data.length != 0) {
  data.forEach((element, i = 0) => {
    let link = {
      "source": i,
      "target": i + 1,
      "value": element["quantidade"]
    }
    objetData.links.push(link);
  });
} else {
  objetData = {
    "nodes": [
      {
        "name": "Proposta"
      },
      {
        "name": "Aceita"
      },
      {
        "name": "Em Negociação"
      },
      {
        "name": "Agendada"
      },
      {
        "name": "Realizada"
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "value": 0
      },
      {
        "source": 1,
        "target": 2,
        "value": 0
      },
      {
        "source": 2,
        "target": 3,
        "value": 0
      },
      {
        "source": 3,
        "target": 4,
        "value": 0
      }
    ]
  }
}

  console.log(objetData);

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
        <Sankey
          data={objetData}
          margin={{
            top: 25,
            right: 25,
            left: 25,
            bottom: 25,
          }}
          link={{ stroke: '#000000' }}
        >
          <Legend />
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
    </BoxShadow>
  );
};

export default CardSankeyChart;