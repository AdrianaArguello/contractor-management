import axios from "axios";


const userData = sessionStorage.getItem("tk");
const config = {
    headers: { Authorization: `Bearer ${userData}` }
};
const url = "http://localhost:8000/api/user/getAll";

export async function getAllEmployees() {
    try {
        const res = await axios.get(url, config);
        const data = res.data;
        return data;
    }
    catch(err){
        return err.response;
    }
};


// export async function getUserDetail() {
//     try {
//         const res = await axios.get("localhost:8000/api/user/detail");
//         return res;
//     }
//     catch(err){
//         return err.response;
//     }
// };

// contractors 
// export async function getContractorById(id) {
//     try {
//         const res = await axios.get(`localhost:8000/api/contractors/get/${id}`);
//         return res;
//     }
//     catch(err){
//         return err.response;
//     }
// };

export async function getAllContractors() {
    try {
        const res = await axios.get("http://localhost:8000/api/contractors/get", config);
        const data = res.data;
        return data;
    }
    catch(err){
        return err.response;
    }
};

export async function deleteContractors(id) {
    try {
        const res = await axios.get(`localhost:8000/api/contractors/delete/${id}`);
        return res;
    }
    catch(err){
        return err.response;
    }
};

// charges 

export async function getCharges() {
    try {
        const res = await axios.get('http://localhost:8000/api/charges/get', config);
        const data = res.data.charges;
        return data;
    }
    catch(err){
        return err.response;
    }
};

export async function getChargesById(id) {
    try {
        const res = await axios.get(`localhost:8000/api/charges/get/${id}`);
        return res;
    }
    catch(err){
        return err.response;
    }
};

export async function deleteCharges(id) {
    try {
        const res = await axios.get(`localhost:8000/api/charges/delete/${id}`);
        return res;
    }
    catch(err){
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
        const res = await axios.get('http://localhost:8000/api/roles/get', config);
        const data = res.data.roles;
        return data;
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

