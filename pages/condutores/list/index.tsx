import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {DataGrid, GridColDef, valueFormatter} from '@mui/x-data-grid';
import {useRouter} from 'next/router';
import moment from 'moment';

import Menu from '../../../components/menu';
import Layout from '../../../components/layout';
import LinkButton from '../../../components/linkButton';

import styles from './listCondutores.module.scss';
interface Icondutores {
  nome: string,
  id: number,
  numeroHabilitacao: string,
  catergoriaHabilitacao: string,
  vencimentoHabilitacao: Date,
}

const gridStyle = {
    '& .MuiDataGrid-row': {
        color: '#333',
        cursor: 'pointer',
    },
    '& .MuiDataGrid-cell': {
        border: 'none',
    },
};

export default function Condutores() {
    const [condutores, setCondutores] = useState<Array<any>>([]);
    const router = useRouter();
    const rows = condutores;
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'nome', headerName: 'Nome', width: 130},
        {field: 'numeroHabilitacao', headerName: 'Numero da habilitação', width: 180},
        {field: 'catergoriaHabilitacao', headerName: 'Categoria', width: 90},
        {field: 'vencimentoHabilitacao', headerName: 'Vencimento', width: 180, valueFormatter: (params) => moment(params.vencimentoHabilitacao).format('YYYY MM DD')},
    ];

    const handlerRow = (row: Icondutores) => {
        const parametro = row.id;
        router.push(`/condutores/edit/${parametro}`);
    };

    async function handlerCondutores() {
        try {
            const condutoresTemp = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Condutor');
            setCondutores(condutoresTemp.data);
        } catch (erro) {
            console.error('Ocorreu um erro na chamada de API:', erro);
        }
    }

    useEffect(() => {
        handlerCondutores();
    }, []);
    return (
        <Layout>
            <Menu />
            <div className={styles.header}>
                <LinkButton
                    route='/condutores/create'
                    text='adicionar novo condutor'
                    className={styles.buttonCliente}
                />
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={(row: any) => handlerRow(row)}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10]}
                sx={gridStyle}
            />
        </Layout>
    );
}
