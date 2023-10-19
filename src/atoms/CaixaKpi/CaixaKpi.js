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
      // marginBottom="25px"
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        width="80%"
        height="auto"
        padding={0}
      >
        <Typography fontSize="18px" color="black" fontFamily="Inter">
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
            {porcentagem >= 0 ? (
              <ArrowDropUpIcon className={classes.positive}></ArrowDropUpIcon>
            ) : (
              <ArrowDropDownIcon
                className={classes.negative}
              ></ArrowDropDownIcon>
            )}

            <Typography fontSize="12px" fontWeight="bold" marginLeft={-1}>
              {porcentagem}%
            </Typography>
          </Stack>
        </Box>
      ) : null}
    </BoxShadow>
  );
};

export default CaixaKpi;
