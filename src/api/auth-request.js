import axios from "axios";
import Swal from 'sweetalert2';


export async function getCounts() {
    const userData = sessionStorage.getItem("tk");
    try {
        const res = await axios.get("http://localhost:8000/api/contractors/counts", {
            headers: { Authorization: `Bearer ${userData}` }
        });
        const data = res.data;
        return data;
    }
    catch(err){
        return err.response;
    }
};


export async function getUserDetail() {
    const userData = sessionStorage.getItem("tk");
    try {
        const res = await axios.get("http://localhost:8000/api/user/detail", {
            headers: { Authorization: `Bearer ${userData}` }
        });
        const data = res.data;
        return data;
    }
    catch(err){
        return err.response;
    }
};

export async function getEmployeeById(id) {
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get(`http://localhost:8000/api/user/get/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
};

 
export async function getContractorById(id) {
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get(`http://localhost:8000/api/contractors/get/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
};

export async function getAllContractors() {
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get("http://localhost:8000/api/contractors/get", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
};

export async function deleteContractors(id) {
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.delete(`http://localhost:8000/api/contractors/delete/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            Swal.fire({
                title:'¡Se ha eliminado correctamente!',
                icon: 'success',
                confirmButtonText:'Continuar'
            })
            return data;
        }
    }
    catch(err){
        Swal.fire({
            title: '¡Error!',
            icon: 'error',
            confirmButtonText: 'Continuar'
        })
        return err.response;
    }
};

export async function getAllEmployeesByContractor() {
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get('http://localhost:8000/api/contractors/getData',{
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
};

export async function getAllEmployees() {
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get('http://localhost:8000/api/user/getAll',{
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
};

export async function getEmployeeByIdContractor(id) {
    try {
        const token = sessionStorage.getItem("tk");
        console.log('soy el id', id)
        if(token !== null){
            const res = await axios.get( `http://localhost:8000/api/employeesRates/getByIdContractor/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
};

// charges 

export async function getCharges() {
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
        const res = await axios.get('http://localhost:8000/api/charges/get',  {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data.charges;
        return data;
        }
    }
    catch(err){
        return err.response;
    }
};

export async function getChargesById(id) {
    try {
        const token = sessionStorage.getItem("tk");
        if(token){
            const res = await axios.get(`http://localhost:8000/api/charges/get/${id}`, {
                headers: { Authorization: `Bearer ${token}` }},);
            return res;
        }
    }
    catch(err){
        return err.response;
    }
};

export async function deleteChargesById(id) {
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.delete(`http://localhost:8000/api/charges/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            Swal.fire({
                title:'¡Se ha eliminado correctamente!',
                icon: 'success',
                confirmButtonText:'Continuar'
            })
            return data;
        }
    }
    catch(err){
        Swal.fire({
            title: '¡Error!',
            icon: 'error',
            confirmButtonText: 'Continuar'
        })
        return err.response;
    }
};

//  roles 

export async function getRolesById(id) {
    try {
        const res = await axios.get(`localhost:8000/api/roles/get/${id}`);
        return res;
    }
    catch(err){
        return err.response;
    }
};

export async function getRoles() {
    try {
        const token = sessionStorage.getItem("tk");
        if(token){
            const res = await axios.get('http://localhost:8000/api/roles/get', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data.roles;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
};

export async function deleteRoles(id) {
    try {
        const res = await axios.get(`localhost:8000/api/roles/delete/${id}`);
        return res;
    }
    catch(err){
        return err.response;
    }
};

// periods
export async function getAllPeriods(){
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get('http://localhost:8000/api/period/get', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
}

export async function getPeriodsById(id){
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get( `http://localhost:8000/api/period/get/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
}

export async function deletePeriodById(id){
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.delete(`http://localhost:8000/api/period/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            Swal.fire({
                title:'¡Se ha eliminado correctamente!',
                icon: 'success',
                confirmButtonText:'Continuar'
            })
            return data;
        }
    }
    catch(err){
        Swal.fire({
            title: '¡Error!',
            icon: 'error',
            confirmButtonText: 'Continuar'
        })
        return err.response;
    }
}

// rates
export async function getRatesById(id){
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get(`http://localhost:8000/api/rate/get/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
}

export async function getAllRates(){
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get('http://localhost:8000/api/rate/get', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
}

// reports
export async function getReportsPDf(){
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get('http://localhost:8000/create-pdf-file', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
}

export async function getReportsJobPDf(id){
    try {
        const token = sessionStorage.getItem("tk");
        if(token !== null){
            const res = await axios.get(`http://localhost:8000/create-job-letter/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            return data;
        }
    }
    catch(err){
        return err.response;
    }
}



