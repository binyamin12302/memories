import { Card, Grid } from '@material-ui/core';
import React from "react";
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import Post from './Post/Post';
import useStyles from './style';


const Posts = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);

  const classes = useStyles();

  return (
    !posts.length ? null : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {

          posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              {post._id === loading ?
                <Card className={classes.card}   >
                  <Loading  />
                </Card>
                : <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />}
            </Grid>
          ))

        }
      </Grid>
    )
  );
};

export default Posts;
