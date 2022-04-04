
import { useEffect } from "react"
import { Button, Card, Table } from "react-bootstrap"
import { deletePelajaran, getPelajaran } from "../../connection/connections"
import { modalForms } from "../helper_components/modal"

export const TablePelajaran = (props)=>{
    useEffect(()=>{
        getPelajaran(props.setList, "")
    },[])
    
    const rows = []
    const data = props.list
    
    for (const key in data) {
        rows.push(<TrPelajaran 
            key={data[key].id} 
            setDataForms={props.setDataForms} 
            dataForms={props.dataForms} 
            setShowModal={props.setShowModal} 
            setModalElements={props.setModalElements} 
            setSaveButtonState = {props.setSaveButtonState}
            data={{
                id: data[key].id,
                nama_pelajaran:data[key].nama,
                jampelajaran:data[key].waktu, 
                kelas:data[key].kelas, 
                id_guru:data[key].guru_id, 
                materi:data[key].materi,
                nama_guru:data[key].nama_guru
            }}/>)
    }
    return (
        <Card style={{backgroundColor:"black",margin:"16px"}}>
            
            <input 
                placeholder="Search.." 
                onChange={(e)=>getPelajaran(props.setList,e.target.value)}></input>
            <Table striped bordered hover variant="dark">
                
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nama Pelajaran</th>
                        <th>Jam Pelajaran</th>
                        <th>Kelas</th>
                        <th>Guru</th>
                        <th>Materi</th>
                        
                        <th>
                            <Button style={{margin:"0"}}variant="primary" onClick={()=>{
                                props.setSaveButtonState(0)
                                props.setModalElements(modalForms({nama_pelajaran:"",waktu:"", kelas:"", id_guru:"", materi:""},"Tambah Pelajaran",props.setDataForms,props.dataForms))
                                props.setShowModal(true)
                            }}>Tambah Pelajaran</Button>
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {rows}
                    
                </tbody>
            </Table>
        </Card>
    )
}

const TrPelajaran = (props)=>{
    const data = props.data
    return(
        <tr>
            <td>{data.id}</td>
            <td>{data.nama_pelajaran}</td>
            <td>{data.jampelajaran}</td>
            <td>{data.kelas}</td>
            <td>{data.nama_guru}</td>
            <td>{data.materi}</td>
            <td>
                <Button style={{margin:"0"}}variant="warning" onClick={()=>{
                    props.setSaveButtonState(1)
                    props.setDataForms(data)
                    props.setModalElements(modalForms(data,"Edit Pelajaran",props.setDataForms,props.dataForms))
                    props.setShowModal(true)
                }}>edit</Button>
                <Button style={{margin:"0"}}variant="danger" onClick={(e)=>{
                    const s = "click once more to confirm deletion"
                    if(e.target.innerText === s) deletePelajaran(data.id)
                    e.target.innerText = s
                }}>Delete</Button>
            </td>
        </tr>
    )
}