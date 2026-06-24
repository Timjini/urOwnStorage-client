export interface AuthAttributes {
  email: string;
  authToken: string;
}

// {
//     "type": "Success",
//     "data": {
//         "data": {
//             "id": "100",
//             "type": "users",
//             "attributes": {
//                 "email": "jennette@becker.example",
//                 "authToken": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDAsInVzZXJfZW1haWwiOiJqZW5uZXR0ZUBiZWNrZXIuZXhhbXBsZSIsImV4cCI6MTc4MjkzNzkwMn0.LzpNoJid3ZNyIAnBz_nrnTW5z3Xd3nF120VzqyErHV4"
//             }
//         }
//     },
//     "message": "User signed in successfully.",
//     "status": 200
// }
