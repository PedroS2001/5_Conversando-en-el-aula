import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicAuthService } from '../auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  userDetail: string;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService
  ) { }

  ngOnInit() {
    // this.ionicAuthService.userDetails().subscribe(response => {
    //   if (response !== null) {
    //     this.userDetail = response.email;
    //   } else {
    //     this.router.navigateByUrl('');
    //   }
    // }, error => {
    //   console.log(error);
    // })
  }

  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }

  goToChatA()
  {
    this.router.navigateByUrl('chats/a');
  }

  goToChatB()
  {
    this.router.navigateByUrl('chats/b');
  }



}
