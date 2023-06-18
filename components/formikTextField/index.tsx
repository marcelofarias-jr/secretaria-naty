import React from 'react';
import {TextField} from '@mui/material';

export function FormikTextField({formik, name, maxLength, ...props}:any) {

    return (
        <>
            <TextField
                id={name}
                name={name}
                value={formik?.values?.[name]}
                onChange={formik.handleChange}
                error={Boolean(formik.touched[name] && formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
                inputProps={{maxLength}}
                {...props}
            />
            {props.multiline && maxLength && 
                <span style={{
                    textAlign: 'right',
                    display: 'block',
                    fontSize: 12,
                    marginTop: formik.touched.answer && formik.errors.answer ? -20 : 0,
                    opacity: props.disabled ? 0.5 : 1,
                }}>
                    {formik?.values?.[name].length}/{maxLength}
                </span>
            }
        </>

    );
}
