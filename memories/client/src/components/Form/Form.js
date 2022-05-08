import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './style';


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const [notification, setNotification] = useState({ err: false, value: '' });

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])


  const handleSubmit = (e) => {
    e.preventDefault();

    if (postData.creator === '' || postData.title === '') return setNotification({
      ...notification,
      err: true,
      value: 'Required field.'
    })


    setNotification({ err: false, value: '' })

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
  }


  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}  >

        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>

        <TextField
          name="creator"
          error={notification.err}
          helperText={notification.value}
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })} required />

        <TextField
          name="title"
          variant="outlined"
          error={notification.err}
          helperText={notification.value}
          label="Title" fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>

        <Button className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth>Submit</Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth>Clear</Button>

      </form>
    </Paper>
  )
}

export default Form;