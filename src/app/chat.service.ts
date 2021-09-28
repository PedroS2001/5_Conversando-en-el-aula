import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: AngularFirestore) { }

  agregarMensaje(correo:string, mensaje:string, cantidad:number, division:string)
  {
     let d = new Date();
     let fecha = d.toLocaleDateString();
     let hora = d.toLocaleTimeString();
     let data = {"mensaje":mensaje, "usuario":correo, "fecha":fecha, "hora":hora};

     let numeroString:string = cantidad.toString();

     this.firestore.collection(division).doc(numeroString).set(data);

    //  this.firestore.collection('mensajes').add(data);
  }

  leerMensajes(division:string)
  {
    return this.firestore.collection(division).snapshotChanges();
    // let data = pedro.get();
    // console.log(data);

    // this.firestore.collection("mensajes").snapshotChanges( (doc:any) => {
    //   console.log("Current data: ", doc.data());
    // });
    // .onSnapshot((doc) => {
    //     console.log("Current data: ", doc.data());
    // });
  }

}
