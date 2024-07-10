import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loadingpage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" className="flex-column gap-1">
        <CircularProgress color="warning"/>
       <h3> Loading....Please Wait</h3>
      </Box>
  )
}

export default Loadingpage