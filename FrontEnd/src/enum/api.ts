export enum api{
    getAll = "http://127.0.0.1:2004/api/v1/admin/getAll",
    getPersonByID = "http://127.0.0.1:2004/api/v1/admin/getPersonByID",
    deleteUserByID = "http://127.0.0.1:2004/api/v1/admin/deleteUserByID",

    addPerson = "http://127.0.0.1:2004/api/v1/user/addPerson",
    getUserDataByID = "http://127.0.0.1:2004/api/v1/user/getUserDataByID",
    cancelRunByID = "http://127.0.0.1:2004/api/v1/user/cancelRunByID",
    updateUserByID = "http://127.0.0.1:2004/api/v1/user/updateUserByID",

    googleLogin = "http://127.0.0.1:2004/google"
}