import React, { useMemo, lazy } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
const CarbonChart = lazy(() => import("../Utils/CarbonChartGrafic"));
import svgBackground from "../../assets/background.svg";


// Move formatNumber function outside of the component to avoid re-creation on each render
function formatNumber(num) {
  return Number(num).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

const ResultComponent = React.memo(({ waterImpactLandfill, waterImpact2dnChance, carbonImpactLandfill, carbonImpact2dnChance }) => {
  const waterReductionPercentage = useMemo(
    () => ((waterImpactLandfill - waterImpact2dnChance) / waterImpactLandfill) * 100,
    [waterImpactLandfill, waterImpact2dnChance]
  );

  const carbonReductionPercentage = useMemo(
    () => ((carbonImpactLandfill - carbonImpact2dnChance) / carbonImpactLandfill) * 100,
    [carbonImpactLandfill, carbonImpact2dnChance]
  );

  // Use useMemo for waterMitigated calculation
  const waterMitigated = useMemo(() => waterImpactLandfill - waterImpact2dnChance, [waterImpactLandfill, waterImpact2dnChance]);

  const dataCarbon = useMemo(
    () => [
      {
        name: '',
        landfill: carbonImpactLandfill.toFixed(1),
        closeloop: carbonImpact2dnChance.toFixed(1),
        mitiga: Math.abs(carbonImpactLandfill - carbonImpact2dnChance).toFixed(2),
      },
    ],
    [carbonImpactLandfill, carbonImpact2dnChance]
  );

  return (
<Card sx={{ 
    width: '100%', 
    height: '80%',
    background: ``,
    borderRadius: '25px',
}}>
      <CardContent sx={{ marginBottom: '0px' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '0px',
            paddingLeft: '6px',
            paddingRight: '6px',
            fontSize: '1.1rem',
          }}
        >
          {Math.abs(dataCarbon[0].mitiga) < 0.0001
            ? "Descubrí el impacto positivo de gestionar tus remanetes:"
            : `Mitiga ${formatNumber(carbonReductionPercentage)}% de ☁ CO2e respecto a su fin de vida en un vertedero mediante gestión y reciclaje ♻️:`}
        </Typography>

        <CarbonChart data={dataCarbon} carbonReductionPercentage={carbonReductionPercentage} formatNumber={formatNumber}/>

        <Box display="flex" justifyContent="center">
          <Box>
            {waterReductionPercentage > 0 && waterMitigated > 0 && (
              <>
               
                <hr />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.1rem',
                    marginBottom: '0px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    paddingLeft: '3rem',
            paddingRight: '3rem',
                  }}
                >{`Evita usar💧${formatNumber(waterMitigated)} Lts. = ${formatNumber(waterMitigated / 900)} años de consumo humano`}</Typography>
                 <Typography
                  variant="body2"
                  sx={{
                    fontSize: '1 rem',
                    marginBottom: '5px',
                    textAlign: 'center',
                  }}
                >{`Se reduce en un ${formatNumber(waterReductionPercentage)}% la huella hídrica realizando separación en origen.`}</Typography>
                <a 
                  href="https://emf.thirdlight.com/link/2axvc7eob8zx-za4ule/@/preview/1?o" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}
                >
              (datos hídricos Fund. Ellen MacArthur)
                </a>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8em', marginTop: '8px', flexWrap: 'wrap' }}>
              {/* <p style={{ lineHeight: '1', marginBottom: '0', fontWeight: 'bold', color: '#00947A' }}>*♻ Separación en origen, gestión y reciclaje remanentes de tizada.</p> */}
              
            </div> 
              </>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

export default ResultComponent;