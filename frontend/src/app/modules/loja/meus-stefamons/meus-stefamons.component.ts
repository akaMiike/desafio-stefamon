import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Jogador } from 'src/app/models/Jogador.model';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { JogadorService } from 'src/app/shared/services/jogador.service';

@Component({
  selector: 'app-meus-stefamons',
  templateUrl: './meus-stefamons.component.html',
  styleUrls: ['./meus-stefamons.component.css']
})
export class MeusStefamonsComponent {

  @Input() dadosJogador: Jogador;
  @Output() dadosJogadorChange = new EventEmitter<Jogador>();
  
  stefamonEscolhido: Stefamon;
  mostrarModalConfirmacao: boolean = false;

  constructor(private jogadorService: JogadorService){ }


  escolherStefamonVenda(stefamon: Stefamon){
    this.mostrarModalConfirmacao = true;
    this.stefamonEscolhido = stefamon;
  }

  venderStefamon(){
    this.jogadorService.venderStefamon(this.dadosJogador.id, this.stefamonEscolhido.id).subscribe((jogadorAtualizado) => {
      this.dadosJogador = jogadorAtualizado;
      this.dadosJogadorChange.emit(this.dadosJogador);
    })
    alert('O stefamon foi vendido com sucesso.')
    this.mostrarModalConfirmacao = false;
  }

}
