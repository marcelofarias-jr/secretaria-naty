import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {useRouter} from 'next/router';

import Menu from '../../../components/menu';
import Layout from '../../../components/layout';

import styles from './createVeiculo.module.scss';

import 'react-datepicker/dist/react-datepicker.css';
interface Iveiculo {
    id: string,
    placa: string,
    marcaModelo: string,
    anoFabricacao: number,
    kmAtual: number,
  }
export default function CreateVeiculo() {
    const router = useRouter();
    const initialValues = {
        placa: '',
        marcaModelo: '',
        anoFabricacao: '',
        kmAtual: '',
    };

    const validationSchema = Yup.object().shape({
        placa: Yup.string(),
        marcaModelo: Yup.string(),
        anoFabricacao: Yup.number(),
        kmAtual: Yup.number(),
    });

    const handleSubmit = async (values: Iveiculo) => {
        await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Veiculo', values);
        router.push('/veiculos/list');

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
                }) => (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TextField
                            id='outlined-basic'
                            label='Placa'
                            variant='outlined'
                            name='placa'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Marca/Modelo'
                            variant='outlined'
                            name='marcaModelo'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Ano de fabricação'
                            variant='outlined'
                            name='anoFabricacao'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                            type='number'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Km atual'
                            variant='outlined'
                            name='kmAtual'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                            type='number'
                        />
                        <button type='submit' className={styles.button}>Cadastrar</button>
                    </form>
                )}
            </Formik>
        </Layout>
    );
}
