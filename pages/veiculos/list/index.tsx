import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../../../components/layout";
import Menu from "../../../components/menu";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./listVeiculos.module.scss"
import { useRouter } from "next/router";
import LinkButton from "../../../components/linkButton";
interface Iveiculo {
  id: number,
  placa: string,
  marcaModelo: string,
  anoFabricacao: number,
  kmAtual: number,
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

export default function Veiculos(){
    const [veiculos, setVeiculos] = useState<Array<any>>([]);
    const router = useRouter  ()
    const rows = veiculos;
    const handlerRow = (row: Iveiculo) =>{
      const parametro = row.id;
      router.push(`/veiculos/edit/${parametro}`)
    }
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'placa', headerName: 'Placa', width: 130 },
      { field: 'anoFabricacao', headerName: 'Ano de fabricação', width: 130 },
      { field: 'kmAtual', headerName: 'Km atual', width: 90,},
      { field: 'marcaModelo', headerName: 'Marca/Modelo', width: 120,},
    ];
    async function handlerVeiculos() {
        try {
          const veiculosTemp = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Veiculo');
          setVeiculos(veiculosTemp.data);
        } catch (erro) {
          console.error('Ocorreu um erro na chamada de API:', erro);
        }
      }
      useEffect(() => {
        handlerVeiculos();
      },[])
    return(
        <Layout>
            <Menu />       
            <div className={styles.header}>
              <LinkButton
                route="/veiculos/create"
                text="adicionar novo veículo"
                className={styles.buttonCliente}
              />
            </div>   
            <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={(row: any) => handlerRow(row)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            getRowId={row => row.id}
            sx={gridStyle}
          />
        </Layout>

    );
}