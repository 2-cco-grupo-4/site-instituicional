import useStyles from "./CaixaKpi.styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Container from "atoms/Container";

import { Box, Typography, Stack } from "@mui/material";
import BoxShadow from "atoms/BoxShadow/BoxShadow";
import { style } from "@mui/system";

const CaixaKpi = ({ valorKpi, textoKpi, porcentagem, direita }) => {
  const classes = useStyles();

  return (
    <BoxShadow
      width="100%"
      height="120px"
      flexDirection="row"
      alignItems="center"
      border="2px solid green"
      {...(porcentagem >= 0
        ? { borderColor: "#00BF24" }
        : { borderColor: "#FF1744" })}
      // marginBottom="25px"
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        width="100%"
        height="auto"
        padding={0}
      >
        <Typography fontSize="16px" color="black" fontFamily="Inter">
          {direita ? (
            <>
              <Box fontWeight="regular" component="span">
                {textoKpi}
              </Box>{" "}
              <Box fontWeight="bold" component="span">
                {valorKpi}
              </Box>
            </>
          ) : (
            <>
              <Box fontWeight="bold" component="span">
                {valorKpi}
              </Box>{" "}
              <Box fontWeight="regular" component="span">
                {textoKpi}
              </Box>
            </>
          )}
        </Typography>
      </Box>
      {porcentagem ? (
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="end"
          width="20%"
          height="auto"
          padding={0}
          mr={6}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ flexWrap: "wrap", gap: 0 }}
          >
            <Typography
              fontSize="14px"
              fontWeight="bold"
              style={{
                color: porcentagem >= 0 ? "#007816" : "#8A0C25",
              }}
            >
              {porcentagem.toFixed(2)}%
            </Typography>
          </Stack>
        </Box>
      ) : null}
    </BoxShadow>
  );
};

export default CaixaKpi;
