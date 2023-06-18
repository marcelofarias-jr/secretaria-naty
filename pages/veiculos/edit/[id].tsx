import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {TextField} from '@mui/material';

import Menu from '../../../components/menu';
import Layout from '../../../components/layout';

import styles from './edit-veiculos.module.scss';

interface Iveiculo {
    id: string,
    placa: string,
    marcaModelo: string,
    anoFabricacao: number,
    kmAtual: number,
  }

export default function EditVeiculos() {
    const [veiculo, setVeiculo] = useState<Iveiculo>();
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const router = useRouter();
    const idVeiculo = router.query.id;
    console.log({veiculo});
    async function handlerCondutor(Id: Partial<Iveiculo>) {
        if (Id) {
            try {
                const veiculoTemp = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${Id}`);
                setVeiculo(veiculoTemp.data);
            } catch (erro) {
                console.error('Ocorreu um erro na chamada de API:', erro);
            }
        }

    }

    const initialValues = ({
        id: veiculo?.id || '',
        placa: veiculo?.placa || '',
        marcaModelo: veiculo?.marcaModelo || '',
        anoFabricacao: (veiculo != null) ? veiculo.anoFabricacao : '',
        kmAtual: veiculo?.kmAtual || '',
    });

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        placa: Yup.string(),
        marcaModelo: Yup.string(),
        anoFabricacao: Yup.number(),
        kmAtual: Yup.number(),
    });

    const handleSubmit = async (values: Iveiculo) => {
        await axios.put(`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${idVeiculo}`, values);
        router.push('../list');
    };
    const handlerEdit = (isEditable: boolean) => {
        setIsEditable(!isEditable);
    };
    const deleteVeiculo = async (id: string) => {
        await axios.delete(`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`, {data: {id: id}});
        router.push('../list');
    };
    useEffect(() => {
        handlerCondutor(idVeiculo);
    }, [idVeiculo]);
    return (
        <Layout>
            <Menu />
            <div className={styles.header}>
                <h1>Editando condutor</h1>
            </div>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({handleSubmit, values, handleChange}) => (
                    <Form onSubmit={handleSubmit} className={styles.form} noValidate>
                        <TextField
                            label='Placa'
                            name='placa'
                            variant='filled'
                            onChange={handleChange}
                            autoComplete='off'
                            value={values.placa}
                            disabled={true}
                            className={styles.formInput}
                        />
                        <TextField
                            label='Marca/Modelo'
                            name='marcaModelo'
                            variant='filled'
                            onChange={handleChange}
                            autoComplete='off'
                            value={values.marcaModelo}
                            disabled={!isEditable}
                            className={styles.formInput}

                        />
                        <TextField
                            label='Ano de fabricação'
                            name='anoFabricacao'
                            variant='filled'
                            onChange={handleChange}
                            autoComplete='off'
                            value={values.anoFabricacao}
                            disabled={!isEditable}
                            className={styles.formInput}
                        />
                        <TextField
                            label='Km Atual'
                            name='kmAtual'
                            variant='filled'
                            onChange={handleChange}
                            autoComplete='off'
                            value={values.kmAtual.toString()}
                            disabled={!isEditable}
                            className={styles.formInput}
                        />
                        <div className={styles.controlers}>
                            {!isEditable &&
                                <>

                                    <button onClick={() => handlerEdit(isEditable)} className={styles.button}>Editar usuário</button>
                                    <button className={styles.button} onClick={() => deleteVeiculo(idVeiculo)}>Deletar usuário</button>
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
