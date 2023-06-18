import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {useRouter} from 'next/router';

import Layout from '../../../components/layout';
import Menu from '../../../components/menu';

import styles from './createCliente.module.scss';
interface Iclient {
    id: string,
    numeroDocumento: string,
    tipoDocumento: string,
    nome: string,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string
  }
export default function CreateCliente() {
    const router = useRouter();
    const initialValues = {
        id: '',
        numeroDocumento: '',
        tipoDocumento: '',
        nome: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        numeroDocumento: Yup.string(),
        tipoDocumento: Yup.string(),
        nome: Yup.string(),
        logradouro: Yup.string(),
        numero: Yup.string(),
        bairro: Yup.string(),
        cidade: Yup.string(),
        uf: Yup.string(),
    });

    const handleSubmit = async (values: Iclient) => {
        await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Cliente', values);
        router.push('/clientes/list');
    };

    return (
        <Layout>
            <Menu />
            <div className={styles.header}>
                <h1>Adicionar cliente</h1>
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
                            label='Numero do documento'
                            variant='outlined'
                            name='numeroDocumento'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Tipo de documento'
                            variant='outlined'
                            name='tipoDocumento'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Endereço'
                            variant='outlined'
                            name='logradouro'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Número'
                            variant='outlined'
                            name='numero'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Bairro'
                            variant='outlined'
                            name='bairro'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Cidade'
                            variant='outlined'
                            name='cidade'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Estado'
                            variant='outlined'
                            name='uf'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <button type='submit' className={styles.button}>Cadastrar</button>
                    </form>
                )}
            </Formik>
        </Layout>
    );
}
