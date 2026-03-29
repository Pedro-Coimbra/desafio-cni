import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  protected readonly chamados = this.chamadosService.chamados;

  protected obterSeverity(categoria: CategoriaChamado): 'danger' | 'info' | 'success' | 'contrast' {
    const severityMap: Record<CategoriaChamado, 'danger' | 'info' | 'success' | 'contrast'> = {
      Hardware: 'danger',
      Software: 'info',
      Rede: 'contrast',
      Acesso: 'success'
    };

    return severityMap[categoria];
  }

  protected trackById(_index: number, chamado: Chamado): number {
    return chamado.id;
  }
}
