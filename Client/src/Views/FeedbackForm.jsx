import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const FeedbackForm = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "40px", minHeight: "100vh" }}>
            <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}><CircularProgress /></div>}>
            
            </Suspense>
        </div>
    );
};

export default FeedbackForm;


