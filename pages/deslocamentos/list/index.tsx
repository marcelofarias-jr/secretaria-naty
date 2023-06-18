import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../components/layout";
import Menu from "../../../components/menu";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./listDeslocamentos.module.scss"
import LinkButton from "../../../components/linkButton";
interface Ideslocamento {
  kmInicial: number,
  inicioDeslocamento: Date,
  checkList: string,
  motivo: string,
  observacao: string,
  idCondutor: Number,
  idVeiculo: Number,
  idCliente: Number,
}
export default function Deslocamentos(){
    const [deslocamento, setDeslocamento] = useState<Array<any>>([]);

    const rows = deslocamento;
    const handlerRow = (row: Ideslocamento) =>{

    }
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'kmInicial', headerName: 'Km Inicial', width: 130 },
      { field: 'inicioDeslocamento', headerName: 'Inicio do deslocamento', width: 130 },
      { field: 'motivo', headerName: 'Motivo', width: 90,},
    ];
    async function handlerDeslocamento() {
        try {
          const deslocamentoTemp = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento');
          setDeslocamento(deslocamentoTemp.data);
        } catch (erro) {
          console.error('Ocorreu um erro na chamada de API:', erro);
        }
      }
      useEffect(() => {
        handlerDeslocamento();
      },[])
      console.log(deslocamento);
    return(
        <Layout>
            <Menu />
            <div className={styles.header}>
            <LinkButton
              route="/deslocamentos/create"
              text="adicionar novo deslocamento"
              className={styles.buttonCliente}
            />
          </div>
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
              onRowClick={(row) => console.log(row)}
            />
        </Layout>
    );


}