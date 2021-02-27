// // import { BehaviorSubject } from 'rxjs'

// // import { handleResponse } from '../helpers/handle-reponse'

// // const currentUserSubject = 
// //     new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

// const API_URL = "http://localhost:4000/entry/";


// // export const authenticationService = {
// //     login,
// //     logout,
// //     currentUser: currentUserSubject.asObservable(),
// //     get currentUserValue() { return currentUserSubject.value }
// // }

// const login = (email, password) => {
//     axios.post(API_URL + 'login/', {
//         email: email,
//         password: password
//     })
//         // .then(handleResponse)
//         .then(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             if (response.data.accessToken) {
//                 localStorage.setItem("user", JSON.stringify(response.data));
//             }

//             return response.data;
//         })
// }

// const logout = () => {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//     currentUserSubject.next(null);
// }


// const getCurrentUser = () => {
//     return JSON.parse(localStorage.getItem("user"));
// };

// export default {
//     login,
//     logout,
//     getCurrentUser,
// };