import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../../../components/menu";
import Layout from "../../../components/layout";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/router";
import styles from "./list-clientes.module.scss"
import LinkButton from "../../../components/linkButton";
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
  const gridStyle = {
    "& .MuiDataGrid-row": {
        color: '#333',
        cursor: 'pointer',
      },
      "& .MuiDataGrid-cell": {
        border: 'none',
      }
  };
export default function Clientes(){
    const [clientes, setClientes] = useState<Array<Iclient>>([]);
    const rows = clientes;
    const router = useRouter()

    const handlerRow = (row: Iclient) =>{
      const parametro = row.id;
      router.push(`/clientes/edit/${parametro}`)
    }
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'nome', headerName: 'Nome', width: 130 },
      { field: 'cidade', headerName: 'Cidade', width: 130 },
      { field: 'tipoDocumento', headerName: 'Tipo do documento', width: 150,},
      { field: 'numeroDocumento', headerName: 'Numero do documento', width: 180,},
    ];
    async function handlerClientes() {
        try {
          const clientesTemp = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Cliente');
          setClientes(clientesTemp.data);
        } catch (erro) {
          console.error('Ocorreu um erro na chamada de API:', erro);
        }
      }
      useEffect(() => {
        handlerClientes();
      },[])
    return(
        <Layout>
          <Menu />
          <div className={styles.header}>
            <LinkButton
              route="/clientes/create"
              text="adicionar novo cliente"
              className={styles.buttonCliente}
            />
          </div>
          <div className={styles.tableContent}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              getRowId={row => row.id}
              onRowClick={(row: any) => handlerRow(row)}
              getRowClassName={() => `tableRow`}
              sx={gridStyle}
            />
          </div>
        </Layout>
    );
}
