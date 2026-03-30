import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { CategoriaChamado, Chamado } from '../../models/chamado.model';
import { ChamadosService } from '../../services/chamados.service';

@Component({
  selector: 'app-chamados-lista-page',
  imports: [ButtonModule, CardModule, RouterLink, TableModule, TagModule],
  templateUrl: './chamados-lista-page.component.html',
  styleUrl: './chamados-lista-page.component.css'
})
export class ChamadosListaPageComponent {
  private readonly chamadosService = inject(ChamadosService);
  private readonly messageService = inject(MessageService);

  readonly chamados = this.chamadosService.chamados;

  obterSeverity(categoria: CategoriaChamado): 'danger' | 'info' | 'success' | 'contrast' {
    const severityMap: Record<CategoriaChamado, 'danger' | 'info' | 'success' | 'contrast'> = {
      Hardware: 'danger',
      Software: 'info',
      Rede: 'contrast',
      Acesso: 'success'
    };

    return severityMap[categoria];
  }

  trackById(_index: number, chamado: Chamado): number {
    return chamado.id;
  }

  excluirChamado(chamado: Chamado): void {
    const confirmouExclusao = window.confirm(
      `Deseja excluir o chamado "${chamado.titulo}"? Esta ação não poderá ser desfeita.`
    );

    if (!confirmouExclusao) {
      return;
    }

    const removido = this.chamadosService.excluirChamado(chamado.id);

    if (removido) {
      this.messageService.add({
        severity: 'success',
        summary: 'Chamado excluído',
        detail: 'O chamado foi removido da fila com sucesso.'
      });
      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Não foi possível excluir',
      detail: 'O chamado não foi encontrado para remoção.'
    });
  }
}
