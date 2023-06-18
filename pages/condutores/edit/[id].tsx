import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {TextField} from '@mui/material';
import dayjs, {Dayjs} from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import {format} from 'date-fns';

import Layout from '../../../components/layout';
import Menu from '../../../components/menu';

import styles from './edit-condutores.module.scss';
interface Icondutor {
    id: string,
    nome: string,
    numeroHabilitacao: string,
    categoriaHabilitacao: string,
    vencimentoHabilitacao: string,
  }

export default function EditCondutores() {
    const [condutor, setCondutor] = useState<Icondutor>();
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const currentDate = new Date();
    //const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(moment(condutor?.vencimentoHabilitacao).format('YYYY MM DD')));
    const formattedDate = format(currentDate, 'dd/MM/yyyy');
    console.log('value', value);
    const router = useRouter();
    const id = router.query.id;
    console.log({value});
    async function handlerCondutor(userId: string) {
        if (userId) {
            try {
                const condutorTemp = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${userId}`);
                setCondutor(condutorTemp.data);
            } catch (erro) {
                console.error('Ocorreu um erro na chamada de API:', erro);
            }
        }

    }
    console.log('condutor', moment(condutor?.vencimentoHabilitacao).format('YYYY MM DD'));
    const initialValues = ({
        id: condutor?.id || '',
        nome: condutor?.nome || '',
        numeroHabilitacao: condutor?.numeroHabilitacao || '',
        categoriaHabilitacao: (condutor != null) ? condutor.categoriaHabilitacao : '',
        vencimentoHabilitacao: condutor?.vencimentoHabilitacao || '',
    });

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        nome: Yup.string(),
        numeroHabilitacao: Yup.string(),
        categoriaHabilitacao: Yup.string(),
        vencimentoHabilitacao: Yup.string(),
    });

    const handleSubmit = async (values: Icondutor) => {
        await axios.put(`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`, values);
        router.push('../list');
    };
    const handlerEdit = (isEditable: boolean) => {
        setIsEditable(!isEditable);
    };
    const deleteCondutor = async (id: string) => {
        await axios.delete(`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`, {data: {id: id}});
        router.push('../list');
    };
    useEffect(() => {
        handlerCondutor(id);
    }, [id]);
    return (
        <Layout>
            <Menu />
            <div className={styles.header}>
                <h1>Editar condutor</h1>
            </div>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({handleSubmit, values, handleChange}) => (
                    <Form onSubmit={handleSubmit} className={styles.form} noValidate>
                        <div className={styles.formName}>
                            <TextField
                                label='Nome'
                                name='nome'
                                onChange={handleChange}
                                autoComplete='off'
                                value={values.nome}
                                disabled={!isEditable}
                                className={styles.formInput}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <TextField
                                label='Número da habilitação'
                                name='numeroHabilitacao'
                                onChange={handleChange}
                                autoComplete='off'
                                value={values.numeroHabilitacao}
                                disabled={!isEditable}
                                className={styles.formInput}

                            />
                            <TextField
                                label='Categoria da habilitação'
                                name='categoriaHabilitacao'
                                onChange={handleChange}
                                autoComplete='off'
                                value={values.categoriaHabilitacao}
                                disabled={!isEditable}
                                className={styles.formInput}
                            />
                            {/* <TextField
                            label='Vencimento da habilitação'
                            name='vencimentoHabilitacao'
                            variant='filled'
                            onChange={handleChange}
                            autoComplete='off'
                            value={values.vencimentoHabilitacao}
                            disabled={!isEditable}
                            className={styles.formInput}
                        /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label='Vencimento da habilitação'
                                        name='vencimentoHabilitacao'
                                        value={value}
                                        variant='filled'
                                        disabled={!isEditable}
                                        className={styles.datepick}
                                    //onChange={(newValue) => setValue(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                        </div>

                        <div className={styles.controlers}>
                            {!isEditable &&
                                <>

                                    <button onClick={() => handlerEdit(isEditable)} className={styles.button}>Editar usuário</button>
                                    <button className={styles.button} onClick={() => deleteCondutor(id)}>Deletar usuário</button>
                                </>
                            }

                            {isEditable &&
                                <>
                                    <button onClick={() => handlerEdit(isEditable)} className={styles.button}>Cancelar</button>
                                    <button className={styles.button} type='submit'>Salvar</button>
                                </>
                            }
                        </div>

                    </Form>
                )}
            </Formik>
        </Layout>
    );
}
