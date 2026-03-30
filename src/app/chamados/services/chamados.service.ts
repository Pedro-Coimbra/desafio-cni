import { Injectable, signal } from '@angular/core';

import { CHAMADOS_INICIAIS } from '../data/chamados.mock';
import { Chamado, CriarChamadoInput } from '../models/chamado.model';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {
  private readonly chamadosState = signal<Chamado[]>([...CHAMADOS_INICIAIS]);

  readonly chamados = this.chamadosState.asReadonly();

  buscarChamadoPorId(id: number): Chamado | undefined {
    return this.chamadosState().find((chamado) => chamado.id === id);
  }

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

  atualizarChamado(id: number, input: CriarChamadoInput): Chamado | undefined {
    let chamadoAtualizado: Chamado | undefined;

    this.chamadosState.update((chamados) =>
      chamados.map((chamado) => {
        if (chamado.id !== id) {
          return chamado;
        }

        chamadoAtualizado = {
          ...chamado,
          ...input
        };

        return chamadoAtualizado;
      })
    );

    return chamadoAtualizado;
  }

  excluirChamado(id: number): boolean {
    let removido = false;

    this.chamadosState.update((chamados) =>
      chamados.filter((chamado) => {
        const manterChamado = chamado.id !== id;

        if (!manterChamado) {
          removido = true;
        }

        return manterChamado;
      })
    );

    return removido;
  }

  private obterProximoId(): number {
    return this.chamadosState().reduce((maiorId, chamado) => Math.max(maiorId, chamado.id), 0) + 1;
  }
}
