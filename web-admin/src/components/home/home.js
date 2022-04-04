
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addPelajaran, editPelajaran, editUser, registerUser } from "../../connection/connections";
import { tokenCookies } from '../helper_components/authentication';
import { ShowModal } from "../helper_components/modal";
import { Navigation } from "./navigation";
import { TablePelajaran } from "./table_pelajaran";
import { TableUsers } from "./table_users";

function renderTable(
    params,
    list,
    setList,
    setShowModal,
    setModalElements,
    setDataForms,
    dataForms, 
    setSaveButtonState) {
    const tablePelajaran = (list && <TablePelajaran 
        setDataForms={setDataForms} 
        dataForms={dataForms} 
        list={list}  
        setList={setList} 
        setShowModal={setShowModal} 
        setModalElements={setModalElements}
        setSaveButtonState={setSaveButtonState}/>)

    const tableUsers = (list && <TableUsers 
        setDataForms={setDataForms} 
        dataForms={dataForms} list={list}  
        setList={setList} 
        setShowModal={setShowModal} 
        setModalElements={setModalElements}
        setSaveButtonState={setSaveButtonState}/>)

    const title = (t)=>(
        <div key="1" style={{backgroundColor:"black", padding:"8px"}}>
            <h1  style={{color:"white"}}>{t}</h1>
        </div>
    )

    switch (params) {
        case 0:
            return([title("Pelajaran"),tablePelajaran])
        case 1:
            
            return([title("Users"),tableUsers])
        default:
            return([title("Pelajaran"),tablePelajaran])
    }
}

export const Home = ()=>{
    const navigate = useNavigate()
    useEffect(()=>{
        if (tokenCookies().length < 3) {
            navigate('/login')
        }
        
    })
    const [showList, setShowList] = useState(0)
    const [list, setList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalElements, setModalElements] = useState([<div key="1">no elements</div>])
    const [dataForms, setDataForms] = useState({})
    const [saveButtonState, setSaveButtonState] = useState(0)
    
    return(

        <div>
            
            <Navigation 
                setShowList={setShowList} 
                setList={setList} 
                list={list}
            />
            {renderTable(
                showList,
                list,
                setList,
                setShowModal,
                setModalElements,
                setDataForms,
                dataForms,
                setSaveButtonState
            )}
            <ShowModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                elements={modalElements} 
                saveButtonState={saveButtonState}
                setDataForms={setDataForms}
                buttons={
                    showList !== 1? 
                        [
                            <Button key="btn" variant="primary" onClick={()=>{addPelajaran(dataForms)}}>Save changes</Button>,
                            <Button key="btn" variant="primary" onClick={()=>{editPelajaran(dataForms)}}>Save changes</Button>
                        ]
                        :
                        [
                            <Button key="btn" variant="primary" onClick={()=>{registerUser(dataForms)}}>Save changes</Button>,
                            <Button key="btn" variant="primary" onClick={()=>{editUser(dataForms)}}>Save changes</Button>
                        ]
                }
            />
        </div>
    )
}



