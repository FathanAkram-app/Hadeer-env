
import { Button, Form, Modal } from "react-bootstrap"

export const ShowModal = (props)=>{
    
    
    return ( 
        <Modal show={props.showModal} backdrop="static" style={{position: 'fixed',top:0,right:0,left:0,bottom:0}}>
            <Modal.Body>
                {props.elements}
            </Modal.Body>
        
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{
                    props.setShowModal(false)
                    props.setDataForms({})
                }}>Close</Button>
                {props.buttons[props.saveButtonState]}
            </Modal.Footer>
        </Modal>
    )
}

const valueForm = (key,inputs,v)=>{
    
    const data = v
    data[key] = inputs[key]
    return data
}




export const modalForms = (inputs,type,setDataForms,dataForms)=>{
    var arr = []
    arr.push(<h1 key="header">{type}</h1>)
    for (var key in inputs) {
        setDataForms((v)=>valueForm(key,inputs,v))
        if (key !== "id" && key !== "nama_guru") {
            const ip = (key !=="waktu" && key !== "jampelajaran" ?(key!=="password" ? "text" : "password") : "time" )
            var i = null
            var waktu = null
            var tanggal = null
            if (key === "jampelajaran") {
                i = inputs[key].split("T")
                key = "waktu"
                waktu = i[1].split('.')[0]
                tanggal = i[0]
                const d = dataForms
                d["waktu"] = waktu
                d["tanggal"] = tanggal
                setDataForms(d)
            }
            
            arr.push(input(key,ip,setDataForms, (i ? waktu : inputs[key])))
            if (ip === "time") {
                arr.push(input("tanggal","date",setDataForms,(i ? tanggal : inputs[key])))
                
            }
        }
        
    }
    return (
        <Form className="form">
            {arr}
            
        </Form>
    )
}
// const timeCalculation = (e)=>{
//     const c = e/3600
//     const s = parseInt(Math.floor(c)).toString()
//     const m = (c - Math.floor(c))*60
//     const ml = m.toString().length
//     const mll = (ml>1? m.toString() : "0"+m.toString())
//     if(s.length>1){
//         return Math.floor(c)+":"+mll+":00"
//     }else{
//         return "0"+Math.floor(c)+":"+mll+":00"
//     }
// }

// const dateToday = ()=>{
//     const today = new Date();
//     const yyyy = today.getFullYear();
//     let mm = today.getMonth() + 1;
//     let dd = today.getDate();

//     if (dd < 10) dd = '0' + dd;
//     if (mm < 10) mm = '0' + mm;

//     return yyyy + '-' + mm + '-' + dd;
// }
const input = (label,inputType,setDataForms,value)=>{
    if (label === "roles") {
        return (
            <Form.Group key={label} className="formgroup">
                <Form.Label>{label.replace("_", " ")}</Form.Label>
                <Form.Select 
                    defaultValue={value} 
                    placeholder={"Enter "+label.replace("_", " ")} 
                    onChange={(e)=>setDataForms(data => valueDataForms(label,data,e))} 
                    aria-label="Default select example">
                    <option value="">silahkan pilih</option>
                    <option value="1">Siswa</option>
                    <option value="2">Guru</option>
                    <option value="4">Admin</option>
                </Form.Select>
            </Form.Group>
        )
        
    }
    return(
        <Form.Group key={label} className="formgroup">
            <Form.Label>{label.replace("_", " ")}</Form.Label>
            <Form.Control 
                type={inputType} 
                defaultValue={value} 
                placeholder={"Enter "+label.replace("_", " ")} 
                onChange={(e)=>setDataForms(data => valueDataForms(label,data,e))}/>
            
        </Form.Group>
    )
    
    
}

const valueDataForms = (label,dataForms,e)=>{
    const data = dataForms
    data[label] = e.target.value
    return data
}
