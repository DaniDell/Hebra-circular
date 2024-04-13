import * as React from "react";
import Chip from '@mui/material/Chip';

function Label({ backgroundColor = '#6750a4', text = 'Label' }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const displayText = isHovered ? text : text.slice(0, 6);

    return (
        <Chip size="small"
            label={displayText} 
            style={{backgroundColor, color: '#fff', width: 'auto', fontWeight: 'bold', fontSize: '11px'}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />
    );
}

export default Label;