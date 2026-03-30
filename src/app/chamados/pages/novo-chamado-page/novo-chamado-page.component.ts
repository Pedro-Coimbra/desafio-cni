import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { CATEGORIAS_CHAMADO_OPTIONS } from '../../data/chamados.mock';
import { CategoriaChamado, CriarChamadoInput } from '../../models/chamado.model';
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
  private readonly route = inject(ActivatedRoute);

  readonly categorias = CATEGORIAS_CHAMADO_OPTIONS;
  readonly chamadoId = this.obterChamadoIdDaRota();
  readonly modoEdicao = this.chamadoId !== null;

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

  constructor() {
    this.preencherFormularioSeEdicao();
  }

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

    const input = this.criarInput();

    if (this.modoEdicao && this.chamadoId !== null) {
      const chamadoAtualizado = this.chamadosService.atualizarChamado(this.chamadoId, input);

      if (!chamadoAtualizado) {
        this.messageService.add({
          severity: 'error',
          summary: 'Chamado não encontrado',
          detail: 'Não foi possível localizar o chamado para editar.'
        });
        await this.router.navigate(['/chamados']);
        return;
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Chamado atualizado',
        detail: 'As alterações já foram aplicadas na listagem.'
      });
    } else {
      this.chamadosService.criarChamado(input);
      this.messageService.add({
        severity: 'success',
        summary: 'Chamado criado',
        detail: 'O novo chamado já está disponível na listagem.'
      });
    }

    await this.router.navigate(['/chamados']);
  }

  campoInvalido(campo: 'titulo' | 'descricao' | 'categoria'): boolean {
    const control = this.chamadoForm.controls[campo];
    return control.invalid && (control.touched || control.dirty);
  }

  obterSectionKicker(): string {
    return this.modoEdicao ? 'Editar chamado' : 'Novo registro';
  }

  obterTituloPagina(): string {
    return this.modoEdicao
      ? 'Atualize um chamado com segurança e contexto'
      : 'Abra um chamado com as informações essenciais';
  }

  obterTextoAuxiliar(): string {
    return this.modoEdicao
      ? 'Revise os dados da solicitação para manter a fila de atendimento sempre atualizada.'
      : 'Preencha os dados principais para que a equipe de suporte tenha contexto suficiente e consiga priorizar o atendimento rapidamente.';
  }

  obterTextoNota(): string {
    return this.modoEdicao
      ? 'Edite o chamado e salve para refletir a nova situação da demanda.'
      : 'Validações básicas ativas para evitar cadastros incompletos.';
  }

  obterLabelSubmit(): string {
    return this.modoEdicao ? 'Salvar alterações' : 'Salvar chamado';
  }

  private preencherFormularioSeEdicao(): void {
    if (!this.modoEdicao || this.chamadoId === null) {
      return;
    }

    const chamado = this.chamadosService.buscarChamadoPorId(this.chamadoId);

    if (!chamado) {
      this.messageService.add({
        severity: 'error',
        summary: 'Chamado não encontrado',
        detail: 'Não foi possível carregar o chamado selecionado.'
      });
      void this.router.navigate(['/chamados']);
      return;
    }

    this.chamadoForm.patchValue({
      titulo: chamado.titulo,
      descricao: chamado.descricao,
      categoria: chamado.categoria
    });
  }

  private criarInput(): CriarChamadoInput {
    const { titulo, descricao, categoria } = this.chamadoForm.getRawValue();

    return {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria: categoria as CategoriaChamado
    };
  }

  private obterChamadoIdDaRota(): number | null {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return null;
    }

    const idConvertido = Number(id);
    return Number.isFinite(idConvertido) ? idConvertido : null;
  }
}
