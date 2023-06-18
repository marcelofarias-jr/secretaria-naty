import {Formik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, {useState} from 'react';
//import DatePicker from 'react-datepicker';
import {useRouter} from 'next/router';
import dayjs, {Dayjs} from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import Menu from '../../../components/menu';
import Layout from '../../../components/layout';

import styles from './createCondutor.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
interface Icondutor {
    id: string,
    nome: string,
    numeroHabilitacao: string,
    categoriaHabilitacao: string,
    vencimentoHabilitacao: string,
  }
export default function CreateCondutor() {
    const [selectedDate] = useState<Date | null>(null);
    const router = useRouter();
    const initialValues = {
        nome: '',
        numeroHabilitacao: '',
        categoriaHabilitacao: '',
    };

    const validationSchema = Yup.object().shape({
        nome: Yup.string(),
        numeroHabilitacao: Yup.string(),
        categoriaHabilitacao: Yup.string(),
        vencimentoHabilitacao: Yup.string(),
    });

    const handleSubmit = async (values: Icondutor) => {
        await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Condutor', values);
        router.push('/condutores/list');

    };

    return (
        <Layout>
            <Menu />
            <div className={styles.header}>
                <h1>Adicionar condutor</h1>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                className={styles.form}
            >
                {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TextField
                            id='outlined-basic'
                            label='Nome'
                            variant='outlined'
                            name='nome'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Número da habilitação'
                            variant='outlined'
                            name='numeroHabilitacao'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Categoria da habilitação'
                            variant='outlined'
                            name='categoriaHabilitacao'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        {/* <DatePicker
                            selected={selectedDate}
                            onChange={date => setFieldValue('vencimentoHabilitacao', date)}
                            placeholderText='Vencimento da habilitação'
                            name='vencimentoHabilitacao'
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    onChange={date => setFieldValue('vencimentoHabilitacao', date?.toISOString())}
                                    label='Vencimento da habilitação'
                                    name='vencimentoHabilitacao'
                                    value={selectedDate}
                                    //onChange={(newValue) => setValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <button type='submit' className={styles.button}>Cadastrar</button>
                    </form>
                )}
            </Formik>
        </Layout>
    );
}
