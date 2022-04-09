import { useEffect } from "react"
import { Button, Card, Table } from "react-bootstrap"
import { deleteUser, getUsers } from "../../connection/connections"
import { modalForms } from "../helper_components/modal"

export const TableUsers = (props)=>{
    useEffect(()=>{
        getUsers(props.setList, "")
        
    },[])
    const rows = []
    const data = props.list
    
    for (const key in data) {
        rows.push(<TrUsers 
            key={key} 
            setDataForms={props.setDataForms} 
            dataForms={props.dataForms} 
            setShowModal={props.setShowModal} 
            setModalElements={props.setModalElements} 
            setSaveButtonState = {props.setSaveButtonState}
            data={{
                id: data[key].id,
                username:data[key].username,
                email:data[key].email, 
                roles:data[key].roles, 
                nama:data[key].nama, 
                kelas:data[key].kelas}}/>)
    }
    return (
        <Card style={{backgroundColor:"black",margin:"16px"}}>
            <input placeholder="Search.." 
                onChange={(e)=>{
                    getUsers(props.setList,e.target.value)
                }}
            ></input>
            <Table striped bordered hover variant="dark">
                
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Nama Lengkap</th>
                        <th>Kelas</th>
                        
                        <th>
                            <Button style={{margin:"0"}}variant="primary" onClick={()=>{
                                props.setModalElements(modalForms({username:"",email:"", roles:"", nama:"", kelas:"",password:""},"Tambah User",props.setDataForms,props.dataForms))
                                props.setShowModal(true)
                                props.setSaveButtonState(0)
                            }}>Tambah User</Button>
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

function renderRoles(role) {
    switch (role) {
        case "1":
            return (<td>Siswa</td>)
        case "2":
            return (<td>Guru</td>)
        case "3":
            return (<td></td>)
        case "4":
            return (<td>Admin</td>)
        
    
        default:
            return (<td>Siswa</td>)
    }
}
const TrUsers = (props)=>{
    const data = props.data
    

    
    return(
        <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.username}</td>
            <td>{data.email}</td>
            {renderRoles(data.roles)}
            <td>{data.nama}</td>
            <td>{data.kelas}</td>
            <td>
                <Button style={{margin:"0"}}variant="warning" onClick={()=>{
                    props.setSaveButtonState(1)
                    props.setDataForms(data)
                    props.setModalElements(modalForms(data,"Edit User",props.setDataForms,data))
                    props.setShowModal(true)
                }}> edit</Button>
                <Button style={{margin:"0"}}variant="danger" onClick={(e)=>{
                    const s = "click once more to confirm deletion"
                    if(e.target.innerText === s) deleteUser(data.id)
                    e.target.innerText = s
                }}>Delete</Button>
            </td>
        </tr>
    )
}