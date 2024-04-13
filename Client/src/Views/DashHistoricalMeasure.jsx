import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMeasuresByUserId, selectMeasures } from "../redux/measuresSlice";
import moment from "moment-timezone";
import loopHebra from "../assets/loop-hebra.gif";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DashHistoricalMeasure = () => {
  const dispatch = useDispatch();
  const { measuresList, isLoading, error } = useSelector(selectMeasures);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Estado local para almacenar las sumatorias
  const [totalCotton, setTotalCotton] = useState("");
  const [totalPolyester, setTotalPolyester] = useState("");
  const [totalMix, setTotalMix] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Calcula las sumatorias al montar el componente o al actualizar measuresList
    const cottonTotal = measuresList.reduce(
      (acc, measure) => acc + measure.managedCottonBaseKg,
      0
    );
    const polyesterTotal = measuresList.reduce(
      (acc, measure) => acc + measure.managedPolyesterBaseKg,
      0
    );
    const mixTotal = measuresList.reduce(
      (acc, measure) => acc + measure.managedMixBaseKg,
      0
    );

    // Actualiza el estado local con las sumatorias calculadas
    setTotalCotton(cottonTotal);
    setTotalPolyester(polyesterTotal);
    setTotalMix(mixTotal);
  }, [measuresList]);

  useEffect(() => {
    // Realizar la llamada para obtener las medidas del usuario cuando el componente se monte
    dispatch(getMeasuresByUserId());
  }, [dispatch]); // Asegúrate de incluir dispatch como dependencia para evitar advertencias de linting

  const totalWaterFootprint = measuresList.reduce(
    (sum, measure) => sum + measure.waterFootprintResult,
    0
  );
  const totalCarbonFootprint = measuresList.reduce(
    (sum, measure) => sum + measure.carbonFootprintResult,
    0
  );
  const sortedMeasuresList = [...measuresList].sort(
    (a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate)
  );
  console.log("sortedMeasuresList:", sortedMeasuresList);

  const firstDay =
    sortedMeasuresList.length > 0
      ? new Date(sortedMeasuresList[0].deliveryDate)
      : null;
  console.log("firstDay:", firstDay);

  const lastDay =
    sortedMeasuresList.length > 0
      ? new Date(sortedMeasuresList[sortedMeasuresList.length - 1].deliveryDate)
      : null;
  console.log("lastDay:", lastDay);

  const totalDays =
    firstDay && lastDay ? moment(lastDay).diff(moment(firstDay), "days") : 0;
  let timeDifference;

  if (totalDays < 90) {
    timeDifference = `${totalDays} dias`;
  } else {
    const totalMonths = Math.round(totalDays / 30.44);
    timeDifference = `${totalMonths} meses`;
  }

  console.log("timeDifference:", timeDifference);

  const ExpandMore = styled((props) => {  const { expand, ...other } = props;
    return <ExpandMoreIcon {...other} />;  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest, }), 
    "&:hover": { color: "white", },  fontSize: 35, }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        minHeight: "calc(100vh - 3rem - 4rem)",
      }}
    >
      <Paper
        sx={{
          padding: "20px",
          borderRadius: "25px",
          marginTop: "16px",
          width: "90%",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Mitigación proyectada
        </Typography>
        <Typography>{`💧 Agua mitigable : ${totalWaterFootprint.toLocaleString(
          "es-ES",
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )} ltr.`}</Typography>
        <Typography>{`☁ CO2e mitigable : ${totalCarbonFootprint.toLocaleString(
          "es-ES",
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )} kg`}</Typography>
        <Typography>{`Recolectado en un periodo de ${timeDifference} `}</Typography>
      </Paper>
      <Typography
  variant="h6"
  component="div"
  gutterBottom
  style={{ backgroundColor: "white", marginTop: "16px", width: "100%", color: theme.palette.secondary.main }}
>
  Registro Histórico de Scrap
</Typography>
      <div style={{ display: "flex", justifyContent: "center", width: "90%" }}>
        {isLoading ? (
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={loopHebra}
              alt="Loading..."
              width="200"
              style={{ position: "absolute", zIndex: 1 }}
            />
            <CircularProgress
              variant="indeterminate"
              color="secondary"
              style={{
                position: "absolute",
                zIndex: 2,
                width: "250px",
                height: "250px",
              }}
            />
          </div>
        ) : error ? (
          <Typography variant="h6" color="secondary">
            No se han registrado entregas a la fecha
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "0.8rem" : "1rem",
                    }}
                    align="left"
                  >
                    {" "}
                    Base fibra{" "}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "1rem" : "1.5rem",
                    }}
                    align="right"
                  >
                    Algodón{" "}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "1rem" : "1.5rem",
                    }}
                    align="right"
                  >
                    Polyester{" "}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "1rem" : "1.5rem",
                    }}
                    align="right"
                  >
                    Mix Textil{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <Table>
              <TableBody>
                {isExpanded &&
                  measuresList.map((measure, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="td"
                        scope="row"
                        style={{ fontWeight: "bold" }}
                        align="right"
                      >
                        {moment
                          .utc(measure.deliveryDate)
                          .add(12, "hours")
                          .tz("America/Argentina/Buenos_Aires")
                          .format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        {measure.managedCottonBaseKg}
                      </TableCell>
                      <TableCell align="right">
                        {measure.managedPolyesterBaseKg}
                      </TableCell>
                      <TableCell align="right">
                        {measure.managedMixBaseKg}
                      </TableCell>
                    </TableRow>
                  ))}

<TableRow>
  <TableCell colSpan={4}>
    <div style={{ display: 'flex', backgroundColor: '#009d71', height: '20px' }}>
      <Typography
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          cursor: "pointer",
          display: "flex",
          color: "#f2f2f2",
          fontWeight: "bold", justifyContent: 'end', alignItems: 'center', width: '100%', paddingLeft: 10,
        }}
      >
        {isExpanded
          ? "Ocultar datos pormenorizados"
          : "Mostrar los registros por día"}
        <ExpandMore expand={isExpanded} />
      </Typography>
    </div>
  </TableCell>
</TableRow>

                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "0.8rem" : "1rem",
                    }}
                    align="left"
                  >
                    Totales:
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "1rem" : "1.5rem",
                    }}
                    align="right"
                  >
                    {totalCotton.toLocaleString("de-DE") + " kg"}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "1rem" : "1.5rem",
                    }}
                    align="right"
                  >
                    {totalPolyester.toLocaleString("de-DE") + " kg"}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "1rem" : "1.5rem",
                    }}
                    align="right"
                  >
                    {totalMix.toLocaleString("de-DE") + " kg"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default DashHistoricalMeasure;
