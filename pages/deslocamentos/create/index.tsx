import {Formik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {useState} from 'react';
import DatePicker from 'react-datepicker';

import Menu from '../../../components/menu';
import styles from '../../clientes/create/createCliente.module.scss';
import Layout from '../../../components/layout';
import 'react-datepicker/dist/react-datepicker.css';

interface Ideslocamento {
    kmInicial: number,
    inicioDeslocamento: Date,
    checkList: string,
    motivo: string,
    observacao: string,
    idCondutor: number,
    idVeiculo: number,
    idCliente: number,
  }
export default function CreateDeslocamento() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const initialValues = {
        kmInicial: '',
        inicioDeslocamento: '',
        checkList: '',
        motivo: '',
        observacao: '',
        idCondutor: '',
        idVeiculo: '',
        idCliente: '',
    };

    const validationSchema = Yup.object().shape({
        kmInicial: Yup.number(),
        inicioDeslocamento: Yup.date(),
        checkList: Yup.string(),
        motivo: Yup.string(),
        observacao: Yup.string(),
        idCondutor: Yup.number(),
        idVeiculo: Yup.number(),
        idCliente: Yup.number(),
    });

    const handleSubmit = async (values: any) => {

        await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento', values).then(
            window.location.reload(),
        );
        //await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento', values);
        //window.location.reload()

    };

    return (
        <Layout>
            <Menu />
            <h1>Adicionar deslocamento</h1>
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
                    values,
                }) => (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TextField
                            id='outlined-basic'
                            label='KM inicial'
                            variant='outlined'
                            name='kmInicial'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <DatePicker
                            selected={selectedDate}
                            //onChange={(date) => setSelectedDate(date)}
                            //onChange={(date) => initialValues.vencimentoHabilitacao = date}
                            onChange={date => setFieldValue('inicioDeslocamento', date)}
                            placeholderText='Inicio do deslocamento'
                            name='inicioDeslocamento'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Checklist'
                            variant='outlined'
                            name='checkList'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Motivo'
                            variant='outlined'
                            name='motivo'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='Observação'
                            variant='outlined'
                            name='observacao'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                        <TextField
                            id='outlined-basic'
                            label='ID do condutor'
                            variant='outlined'
                            name='idCondutor'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                            type='number'
                        />
                        <TextField
                            id='outlined-basic'
                            label='ID do veículo'
                            variant='outlined'
                            name='idVeiculo'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                            type='number'
                        />
                        <TextField
                            id='outlined-basic'
                            label='ID do cliente'
                            variant='outlined'
                            name='idCliente'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete='off'
                            type='number'
                        />

                        <button type='submit'>Cadastrar</button>
                    </form>
                )}
            </Formik>
        </Layout>
    );
}
