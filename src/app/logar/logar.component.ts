import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.css']
})
export class LogarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }


  logar(){
    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: UserLogin) => {
        this.userLogin = resp

        environment.foto=this.userLogin.foto
        environment.nome=this.userLogin.nome
        environment.token=this.userLogin.token
        environment.usuario=this.userLogin.usuario
        environment.id=this.userLogin.id

        this.router.navigate(['/inicio'])
      },
      error:
      erro => {
      if(erro.status == 401 && erro.status == 500) {
        alert('Usuário ou senha inválidos!')
      }
    },}
    )
  }

}
