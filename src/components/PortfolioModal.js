import React, {useRef}  from 'react';

import Grid from '@material-ui/core/Grid';

const PortfolioModal = ({modalStatus, toggleModal}) => {
    const wrapperRef = useRef(null);
    const showNotShow = modalStatus ? "display-block" : "display-none";

    return(
        <>
        <div container ref={wrapperRef} className={showNotShow}>
            <Grid>
            Your portfolio growth is at 17%!
            <button onClick={toggleModal}>close</button>
            </Grid>
        </div>
        </>
    );
};

export default PortfolioModal;