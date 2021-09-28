import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { toastController } from '@ionic/core';
import { IonicAuthService } from 'src/app/auth.service';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-b',
  templateUrl: './b.page.html',
  styleUrls: ['./b.page.scss'],
})
export class BPage implements OnInit {

  
  constructor(private chatService:ChatService, private ionicAuthService:IonicAuthService, private toastControl:ToastController) { 
    console.log(this.correo);
    this.LeerMensajes();
  }

  ngOnInit() {
    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
        this.correo = response.email;
      } else {
      }
    }, error => {
      console.log(error);
    })

    this.scrollToBottom();

  }

  mensaje:string = '';
  correo:string = '';
  public mensajes:any = [];

  async presentToast() {
    const toast = await this.toastControl.create({
      message: 'El mensaje es demasiado largo.',
      header: 'No se pudo enviar el mensaje.',
      duration: 1000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  EnviarMensaje()
  {
    if(this.mensaje.length > 21)
    {
      this.presentToast();
      return;
    }
    this.mensaje = this.mensaje.trim();
    if(this.mensaje != '')
    {

      let cantidad:number = 1111;
      for(let item of this.mensajes)
      {
        cantidad++;
      }

      this.chatService.agregarMensaje(this.correo, this.mensaje, cantidad, 'mensajesb');

      this.mensaje = '';
      (<HTMLInputElement> document.getElementById('txtMsj')).focus();
      this.scrollToBottom();

    }   
  }

  LeerMensajes()
  {
    this.chatService.leerMensajes('mensajesb').subscribe((msgsSnapshot) => {
      this.mensajes = [];
      msgsSnapshot.forEach((registro: any) => {
        this.mensajes.push(
          // id: registro.payload.doc.id,
          registro.payload.doc.data()
        );
      })
    });

  }

  
  pulsar(e:any) {
    if (e.keyCode === 13 ) {
      this.EnviarMensaje();
        e.preventDefault();
    }
  }

  handleKeyDown($event:any)
  {
    if ($event.keyCode === 13 ) {
      $event.preventDefault();
      this.EnviarMensaje();
    }
  }


  
  @ViewChild('content')
  content!: ElementRef;

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 
  


}
