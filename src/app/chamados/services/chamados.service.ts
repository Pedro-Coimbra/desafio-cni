import { Injectable, signal } from '@angular/core';

import { CHAMADOS_INICIAIS } from '../data/chamados.mock';
import { Chamado, CriarChamadoInput } from '../models/chamado.model';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {
  private readonly chamadosState = signal<Chamado[]>([...CHAMADOS_INICIAIS]);

  readonly chamados = this.chamadosState.asReadonly();

  criarChamado(input: CriarChamadoInput): Chamado {
    const proximoId = this.obterProximoId();
    const novoChamado: Chamado = {
      id: proximoId,
      titulo: input.titulo,
      descricao: input.descricao,
      categoria: input.categoria
    };

    this.chamadosState.update((chamados) => [novoChamado, ...chamados]);

    return novoChamado;
  }

  private obterProximoId(): number {
    return this.chamadosState().reduce((maiorId, chamado) => Math.max(maiorId, chamado.id), 0) + 1;
  }
}
