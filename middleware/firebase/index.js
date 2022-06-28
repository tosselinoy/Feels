import { database } from '../config'
import { ref, set, child, get } from "firebase/database";


export function addUser(first_name, last_name, id) {
    set(ref(database, 'users/' + id), {
        first_name: first_name,
        last_name: last_name,
        id: id
    });
//   console.log(first_name, last_name, user_name,id);
} 

export function addMessage(date, text, id) {
    set(ref(database, `users/${id}/messages/` + date), {
        date: date,
        text: text
    });
  console.log(date);
} 

export async function getUserById(id){
    const dbRef = ref(database);
    const snapshot =  await get(child(dbRef, `users/${id}`))
    if (snapshot.exists()) {
        // console.log(snapshot.val());
        // const user = await snapshot.val()
        return true;
    } else {
        return false;
    }
}

 export default {
     addUser,
     getUserById,
     addMessage
 }