import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Jogador } from 'src/app/models/Jogador.model';
import { AuthService } from '../../services/auth/auth.service'
import { JogadorService } from '../../services/jogador/jogador.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioEstaLogado: boolean;
  dadosUsuarioLogado: Jogador;
  items: MenuItem[];

  loginForm = this.fb.group({
    usuario: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jogadorService: JogadorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.authService.isAuthenticatedObs.subscribe((estaLogado) => {
      this.usuarioEstaLogado = estaLogado;
    });

    this.getDadosUsuarioLogado();

    this.items = [
      {label: 'Home', icon:'pi pi-home', routerLink:'/home'},
      {label: 'Loja', icon: 'pi pi-shopping-cart', routerLink: '/loja'},
      {label: 'Batalhar', icon: 'pi pi-users', routerLink:'/batalha'}
    ];

  }

  login(){
    this.authService.login(
      this.loginForm.value.usuario!!,
      this.loginForm.value.senha!!
    ).subscribe(() => {
      this.getDadosUsuarioLogado();
    });
  }

  logout(){
    this.usuarioEstaLogado = false;
    this.dadosUsuarioLogado = null;
    this.loginForm.reset();
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  getDadosUsuarioLogado(){
    var nicknameUsuarioLogado = this.authService.getUsuarioLogado();
    
    if(nicknameUsuarioLogado != null){
      return this.jogadorService.buscarPorUsername(nicknameUsuarioLogado).subscribe((dadosUsuario) => {
        this.dadosUsuarioLogado = dadosUsuario;
      })
    }

    return null
  }

}
