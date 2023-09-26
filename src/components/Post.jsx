import { ButtonBase, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { blue } from "@mui/material/colors";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function Post(props) {
    return (
        <Paper>
           <Grid container spacing={1}>
                <Grid item>
                    <h3>{props.title}</h3>
                    <ButtonBase sx={{ width: 128, height: 128}}>
                        <Img 
                        src="https://legacy.reactjs.org/logo-og.png" 
                        alt="Temp photo">
                        </Img>
                    </ButtonBase>
                    <p>{props.text}</p> 
                </Grid>
            </Grid>
        </Paper>
    )
}