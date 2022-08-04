
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const DefaultValues = {
  hash: '',
}

const Calculation = () => {
  const classes = useStyles();

  const [hash, setHash] = useState(DefaultValues.hash);
  const [newHash, setNewHash] = useState(null);
  const [nounce, setNounce] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const queryString = new URLSearchParams({
      hash
    }).toString();
    fetch(`http://localhost:5000/new-hash?${queryString}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data && data.result) {
          setNewHash(data.result.newhash)
          setNounce(data.result.nounce)  
        } else {
          setNewHash(null)
          setNounce(null)  
        }
      })
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Hash"
          variant="filled"
          value={hash}
          type="string"
          required
          onChange={e => {setHash(e.target.value);}}
        />

        <div>
          <Button type="submit" variant="contained" color="primary">
            Get New Hash
          </Button>
        </div>
      </form>
      {newHash === null && <p>No Results</p>}
      {newHash !== null && <h4 color="primary">New hash {newHash} with nounce {nounce}.</h4>}
    </>
  );
};

export default Calculation;