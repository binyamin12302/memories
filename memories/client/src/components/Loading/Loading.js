import { Typography } from '@material-ui/core';
import { Skeleton } from '@mui/material';
import React from 'react';

const Loading = () => {

  return <>
    <Skeleton variant="rectangular" width="100%" >
      <div style={{ paddingTop: '57%' }} />
    </Skeleton>

    <div>
      <Skeleton variant='body2' color="textSecondary" component="p" ></Skeleton>
    </div>

    <Typography variant="h3">
      <Skeleton></Skeleton>
    </Typography>

    <div style={{ paddingTop: '9%' }} >
      <Skeleton variant='body2' color="textSecondary" component="p" ></Skeleton>
    </div>
  </>
}

export default Loading;
