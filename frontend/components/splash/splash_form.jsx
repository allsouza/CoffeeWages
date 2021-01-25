import React from 'react';
import Form from '../reviews/Form';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { ReactComponent as Blob } from '../../../app/assets/images/blob2.svg'

export default function SplashForm() {
    const theme = useTheme();
    const useStyles = makeStyles({
      blob: {
        backgroundColor: theme.palette.backgroundColor
      },
      form: {
        position: "relative",
        width: "100%",
        zIndex: 4,
        paddingBottom: 200,
        background: theme.palette.blobColor,
      }
    });

    const classes = useStyles()

    return(
        <div className={classes.form}>
            <Blob fill={theme.palette.blobColor} className={classes.blob} />
            <div className="splash-form-contents" >
                <h1 className="splash-form-header">Report Your Wage:</h1>
            </div>
            <Form />
        </div>
    )
}