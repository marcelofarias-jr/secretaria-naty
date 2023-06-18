import React from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {TextField} from '@mui/material';

import Layout from '../../../components/layout';
import Menu from '../../../components/menu';

import styles from './editCliente.module.scss';

interface Iclient {
  id: number,
  numeroDocumento: string,
  tipoDocumento: string,
  nome: string,
  logradouro: string,
  numero: string,
  bairro: string,
  cidade: string,
  uf: string
}
export default function EditCliente() {
    const [cliente, setCliente] = useState<Iclient>();
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const router = useRouter();
    const id = router.query.id;

    async function handlerCliente(userId: Partial<Iclient>) {
        console.log(userId);
        if (userId) {
            try {
                console.log('try');
                const clienteTemp = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${userId}`);
                console.log('aqui');
                setCliente(clienteTemp.data);
            } catch (erro) {
                console.error('Ocorreu um erro na chamada de API:', erro);
            }
        }

    }

    const initialValues = ({
        id: (cliente != null ? cliente.id : ''),
        numeroDocumento: cliente?.numeroDocumento || '',
        tipoDocumento: cliente?.tipoDocumento || '',
        nome: (cliente != null) ? cliente.nome : '',
        logradouro: cliente?.logradouro || '',
        numero: cliente?.numero || '',
        bairro: cliente?.bairro || '',
        cidade: cliente?.cidade || '',
        uf: cliente?.uf || '',
    });
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

    const handleSubmit = async (values: any) => {
        await axios.put(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`, values);
    };

    const handlerEdit = (isEditable: boolean) => {
        setIsEditable(!isEditable);
    };
    const deleteCliente = async (id: string) => {
        await axios.delete(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`, {data: {id: id}});
        router.push('../list');
    };
    useEffect(() => {
        handlerCliente(id);
    }, [id]);
    console.log({initialValues});
    return (
        <Layout>
            <Menu />
            <div className={styles.header}>
                <h1>Editar cliente</h1>
            </div>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({handleSubmit, values, handleChange}) => (
                    <Form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formContent}>
                            <TextField
                                label='Nome'
                                name='nome'
                                variant='filled'
                                onChange={handleChange}
                                autoComplete='off'
                                value={values.nome}
                                disabled={!isEditable}
                                className={styles.formInput}
                            />
                            <TextField
                                label='Rua'
                                name='logradouro'
                                variant='filled'
                                onChange={handleChange}
                                autoComplete='off'
                                value={values.logradouro}
                                disabled={!isEditable}
                                className={styles.formInput}
                            />
                            <TextField
                                label='Numero'
                                name='numero'
                                variant='filled'
                                onChange={handleChange}
                                autoComplete='off'
                                value={values.numero}
                                disabled={!isEditable}
                                className={styles.formInput}
                            />
                            <TextField
                                label='Bairro'
                                name='bairro'
                                variant='filled'
                                onChange={handleChange}
                                autoComplete='off'
                                value={values.bairro}
                                disabled={!isEditable}
                                className={styles.formInput}
                            />
                            <TextField
                                label='Cidade'
                                name='cidade'
                                variant='filled'
                                onChange={handleChange}
                                autoComplete='off'
                                value={values.cidade}
                                disabled={!isEditable}
                                className={styles.formInput}
                            />
                            <TextField
                                label='Estado'
                                name='uf'
                                variant='filled'
                                onChange={handleChange}
                                autoComplete='off'
                                value={values.uf}
                                disabled={!isEditable}
                                className={styles.formInput}
                            />
                        </div>

                        <div className={styles.controlers}>
                            {!isEditable &&
                                <>
                                    <button onClick={() => handlerEdit(isEditable)} className={styles.button}>Editar usuário</button>
                                    <button className={styles.button} onClick={() => deleteCliente(id)}>Deletar usuário</button>
                                </>
                            }

                            {isEditable &&
                                <>
                                    <button onClick={() => handlerEdit(isEditable)} className={styles.button}>Cancelar</button>
                                    <button type='submit' className={styles.button}>Salvar</button>
                                </>
                            }

                        </div>

                    </Form>
                )}
            </Formik>
        </Layout>
    );
}
