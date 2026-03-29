import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { CATEGORIAS_CHAMADO_OPTIONS } from '../../data/chamados.mock';
import { CategoriaChamado } from '../../models/chamado.model';
import { ChamadosService } from '../../services/chamados.service';
import { textoObrigatorioValidator } from '../../validators/texto-obrigatorio.validator';

@Component({
  selector: 'app-novo-chamado-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    CardModule,
    InputTextModule,
    SelectModule,
    TextareaModule
  ],
  templateUrl: './novo-chamado-page.component.html',
  styleUrl: './novo-chamado-page.component.css'
})
export class NovoChamadoPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly chamadosService = inject(ChamadosService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly categorias = CATEGORIAS_CHAMADO_OPTIONS;

  readonly chamadoForm = this.formBuilder.group({
    titulo: this.formBuilder.nonNullable.control('', {
      validators: [textoObrigatorioValidator()]
    }),
    descricao: this.formBuilder.nonNullable.control('', {
      validators: [textoObrigatorioValidator()]
    }),
    categoria: this.formBuilder.control<CategoriaChamado | null>(null, {
      validators: [Validators.required]
    })
  });

  async salvarChamado(): Promise<void> {
    if (this.chamadoForm.invalid) {
      this.chamadoForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Revise o formulário',
        detail: 'Preencha título, descrição e categoria antes de salvar.'
      });
      return;
    }

    const { titulo, descricao, categoria } = this.chamadoForm.getRawValue();

    this.chamadosService.criarChamado({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria: categoria as CategoriaChamado
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Chamado criado',
      detail: 'O novo chamado já está disponível na listagem.'
    });

    await this.router.navigate(['/chamados']);
  }

  campoInvalido(campo: 'titulo' | 'descricao' | 'categoria'): boolean {
    const control = this.chamadoForm.controls[campo];
    return control.invalid && (control.touched || control.dirty);
  }
}
