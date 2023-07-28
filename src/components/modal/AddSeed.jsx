import { 
    Modal,
    TextField,
    Button,
    Box,
    Grid,
    Typography,
} from '@mui/material';

import React, { useState } from 'react';

const boxStyle = {
    backgroundColor: '#ffffff', // White background
    width: '40%', // 40% width of the viewport
    height: '40%', // 40% height of the viewport
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    borderRadius: '10px',
    overflow: 'scroll',
  };


const AddSeed = ({ 
    showModal, 
    handleCloseModal,
    addSeedObj,
}) => {
  const [seedObj, setSeedObj] = useState({
    plant: '',
    cultivar: '',
    source: '',
    year: '',
    notes: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSeedObj((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = () => {
    addSeedObj(seedObj);
    handleCloseModal();
    setSeedObj({
        plant: '',
        cultivar: '',
        source: '',
        year: '',
        notes: '',
      });
  };

  return (
    <Modal
      open={showModal}
      onClose={handleCloseModal}
    >
        <Box
            sx={boxStyle}
        >
            <Grid container
                display="flex"
                alignContent="center"
                justifyContent="center"
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography variant="h5" display="flex" justifyContent="center">
                        Add a Seed to Seed Storage
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Plant"
                        name="plant"
                        value={seedObj.plant}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Cultivar"
                        name="cultivar"
                        value={seedObj.cultivar}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Source"
                        name="source"
                        value={seedObj.source}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Year"
                        name="year"
                        value={seedObj.year}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Notes"
                        name="notes"
                        value={seedObj.notes}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="right">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Modal>
  );
};

export default AddSeed;
