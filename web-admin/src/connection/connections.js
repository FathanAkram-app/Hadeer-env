import { tokenCookies } from '../components/helper_components/authentication';

const axios = require('axios').default;
// fix
const baseUrl = "http://localhost"
// Make a request for a user with a given ID
export const getPelajaran = (setList,keywords)=>{
    axios.get(baseUrl+'/api/getpelajaran?search='+keywords)
        .then(function (res) {
            if (res.data.status_code !== 200) {
                alert(res.data.message)
            }else{
                setList(res.data.result)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const submitLogin = (data)=>{
    const d = btoa(JSON.stringify({...data,serverkey:"B1smill4hUJIKOM"}))
    console.log(d)
    axios.post(baseUrl+'/api/admin/login',{},
    {
        headers:{
            "Authorization": d
        }
    })
    .then((res)=>{
        
        if (res.data.status_code !== 200) {
            alert(res.data.message)
            
            console.log(res)
        }else{
            document.cookie = "token="+res.data.result.token;
            window.location.reload()
        }
    })
    .catch(function (error) {
        console.log(error);
    })

}

export const getUsers = (setList,keywords) =>{
    axios.post(baseUrl+'/api/admin/getusers',
    {
        search:keywords,
        token: tokenCookies()
    },
    {
        headers:{
            "Authorization": 'eyJzZXJ2ZXJrZXkiOiJCMXNtaWxsNGhVSklLT00ifQ=='
        }
    })
    .then((res)=>{
        if (res.data.status_code !== 200) {
            alert(res.data.message)
        }else{
            setList(res.data.result)
        }
        
    })
    .catch((error)=>{
        console.log(error)
    })
}
export const addPelajaran = (data) =>{
    const body = {
        nama:data.nama_pelajaran,
        kelas:data.kelas,
        guru_id:parseInt(data.id_guru),
        waktu: data.tanggal+" "+data.waktu+":00",
        materi: data.materi,
        token: tokenCookies()
    }
    axios.post(baseUrl+'/api/addpelajaran',
    body,
    {
        headers:{
            "Authorization": 'eyJzZXJ2ZXJrZXkiOiJCMXNtaWxsNGhVSklLT00ifQ=='
        }
    })
    .then((res)=>{
        if (res.data.status_code !== 200) {
            alert(res.data.message)
        }else{
            window.location.reload()
        }
    })
    .catch((error)=>{
        console.log(body)
        console.log(error)
    })
}

export const deletePelajaran = (id) =>{
    const body = {
        id:id,
        token:tokenCookies()
    }
    axios.post(baseUrl+'/api/deletepelajaran',
    body,
    {
        headers:{
            "Authorization": 'eyJzZXJ2ZXJrZXkiOiJCMXNtaWxsNGhVSklLT00ifQ=='
        }
    })
    .then((res)=>{
        if (res.data.status_code !== 200) {
            alert(res.data.message)
        }else{
            window.location.reload()
        }
    })
    .catch((error)=>{
        console.log(body)
        console.log(error)
    })
}
export const registerUser = (data) =>{
    const auth = btoa(JSON.stringify({...data,serverkey:"B1smill4hUJIKOM"}))
    axios.post(baseUrl+'/api/register',
    {token: tokenCookies()},
    {
        headers:{
            "Authorization": auth
        }
    })
    .then((res)=>{
        if (res.data.status_code !== 200) {
            alert(res.data.message)
        }else{
            window.location.reload()
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const deleteUser = (id) =>{
    const body = {
        id:id,
        token:tokenCookies()
    }
    axios.post(baseUrl+'/api/admin/deleteUser',
    body,
    {
        headers:{
            "Authorization": 'eyJzZXJ2ZXJrZXkiOiJCMXNtaWxsNGhVSklLT00ifQ=='
        }
    })
    .then((res)=>{
        if (res.data.status_code !== 200) {
            alert(res.data.message)
        }else{
            window.location.reload()
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const editPelajaran = (data) =>{
    const body = {
        ...data,
        token:tokenCookies(),
        jampelajaran: data.tanggal+" "+data.waktu
    }
    axios.post(baseUrl+'/api/admin/editpelajaran',
    body,
    {
        headers:{
            "Authorization": 'eyJzZXJ2ZXJrZXkiOiJCMXNtaWxsNGhVSklLT00ifQ=='
        }
    })
    .then((res)=>{
        if (res.data.status_code !== 200) {
            alert(res.data.message)
        }else{
            window.location.reload()
        }
    })
    .catch((error)=>{
        console.log(body)
        console.log(error)
    })
}

export const editUser = (data) =>{
    const body = {
        ...data,
        token:tokenCookies()
    }
    axios.post(baseUrl+'/api/admin/edituser',
    body,
    {
        headers:{
            "Authorization": 'eyJzZXJ2ZXJrZXkiOiJCMXNtaWxsNGhVSklLT00ifQ=='
        }
    })
    .then((res)=>{
        if (res.data.status_code !== 200) {
            alert(res.data.message)
        }else{
            window.location.reload()
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}