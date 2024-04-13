import { Accordion, AccordionSummary, FormLabel, AccordionDetails, FormGroup, FormControlLabel, Checkbox, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomFormControlLabel = ({ value, label, checked, onChange }) => {
    return (
        <>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} />}
                value={value}
                label={label}
                sx={{ '& .MuiFormControlLabel-label': { textAlign: 'left', fontSize: `14px` } }}
            />
            <Divider sx={{ bgcolor: 'grey.800' }} />
        </>
    );
};

const CustomAccordion = ({ summaryLabel, checkboxGroupValues, checkboxGroupChangeHandler, formControlLabels }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <FormLabel
                    component="legend"
                    sx={{textAlign: 'left', paddingBottom: "6px", fontWeight: "bold" }}
                >
                    {summaryLabel}
                </FormLabel>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {formControlLabels.map(label => (
                        <CustomFormControlLabel
                            key={label.value}
                            value={label.value}
                            label={label.label}
                            checked={checkboxGroupValues.includes(label.value)}
                            onChange={checkboxGroupChangeHandler}
                        />
                    ))}
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    );
};

export { CustomAccordion };