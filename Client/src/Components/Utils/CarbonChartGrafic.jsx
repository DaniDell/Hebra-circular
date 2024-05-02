import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';



const CarbonChartGrafic = ({ data , carbonReductionPercentage, formatNumber }) => {
  const COLORS = ['#747373', '#00947a', 'transparent'];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('s'));
  const chartSize = isMobile ? {width: "100%", height: 300, padding:0} : {width: "100%", height:280};

  const CustomizedLabel = ({ x, y, width, height, value, unit, icon, fill, name }) => {
    const valueWithOneDecimal = Math.floor(value * 10) / 10;
    const valueWithComma = parseFloat(valueWithOneDecimal).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const fontSize = isMobile ? "10px" : "14px";
    return (
      <text x={x + width / 1} y={y + height / 1} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize} fontWeight="bold"  fill={fill} name={name} style={{ fontFamily: ', sans-serif' }}>
  
        <tspan x={x + width / 2} dy="-1.2em">{value > 0.00 ? `${name}` : ''}</tspan>
        <tspan x={x + width / 2} dy="-1.1em">{value > 0.00 ? `Huella ` : ''}</tspan> 
        <tspan x={x + width / 2} dy="3.4em"> {value > 0.00 ? `${icon}${valueWithComma} ${unit}` : ''}</tspan>
      </text>
    );
  };

  return (
    <ResponsiveContainer {...chartSize}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom:0 }}>
        <XAxis dataKey="name" />
        <Legend formatter={(value, entry) => entry.dataKey === 'mitiga' ? <span style={{ color: '#4a4a46', fontWeight: 'bold', fontSize: "14px", fontFamily: "", }}>{value}</span> : <span style={{fontWeight: 'bold', fontSize: "14px", }}>{value}</span>} />
        <Bar dataKey="landfill" fill={COLORS[0]} name="Fin de vida en vertedero">
        <LabelList dataKey="landfill" position="center" content={(props) => <CustomizedLabel {...props} unit="CO₂" icon="🗑️" name="Vertedero" />}/>
        </Bar>
        <Bar dataKey="closeloop" stackId="stack" fill={COLORS[1]} name="Reciclaje mecánico HEBRA CIRCULAR">
        <LabelList dataKey="closeloop" position="bottom" content={(props) => <CustomizedLabel {...props} unit="CO₂" icon="♻️" name="Reciclaje" />} />
        </Bar>
        <Bar 
  dataKey="mitiga" 
  stackId="stack" 
  fill={COLORS[2]} 
  name={isNaN(carbonReductionPercentage) ? '❝ Cada acción tiene su costo ambiental 🌎, medirlo permite dimensionarlo❞' : `♻️ Evitaría la emisión de ${formatNumber(data[0]?.mitiga)} Kg. de gases CO₂☁eq. lo que equivale a la capacidad de absorción de ${formatNumber((data[0]?.mitiga) / 150)} 🌳 árboles adultos durante 1 año (ONU).`}
/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CarbonChartGrafic;