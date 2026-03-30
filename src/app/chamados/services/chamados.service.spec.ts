import { TestBed } from '@angular/core/testing';

import { CHAMADOS_INICIAIS } from '../data/chamados.mock';
import { ChamadosService } from './chamados.service';

describe('ChamadosService', () => {
  let service: ChamadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadosService);
  });

  it('should load the initial mock dataset', () => {
    expect(service.chamados().length).toBe(CHAMADOS_INICIAIS.length);
    expect(service.chamados()[0].titulo).toBe(CHAMADOS_INICIAIS[0].titulo);
  });

  it('should create a new chamado with the next sequential id', () => {
    const chamadoCriado = service.criarChamado({
      titulo: 'Novo cadastro',
      descricao: 'Chamado criado durante o teste.',
      categoria: 'Software'
    });

    expect(chamadoCriado.id).toBe(1049);
    expect(service.chamados()[0]).toEqual(chamadoCriado);
    expect(service.chamados().length).toBe(CHAMADOS_INICIAIS.length + 1);
  });

  it('should update an existing chamado', () => {
    const chamadoAtualizado = service.atualizarChamado(1043, {
      titulo: 'Office atualizado',
      descricao: 'Pacote de produtividade revisado para a nova máquina.',
      categoria: 'Software'
    });

    expect(chamadoAtualizado).toEqual(
      jasmine.objectContaining({
        id: 1043,
        titulo: 'Office atualizado'
      })
    );
    expect(service.buscarChamadoPorId(1043)?.descricao).toContain('produtividade revisado');
  });

  it('should delete an existing chamado', () => {
    const removido = service.excluirChamado(1039);

    expect(removido).toBeTrue();
    expect(service.buscarChamadoPorId(1039)).toBeUndefined();
    expect(service.chamados().length).toBe(CHAMADOS_INICIAIS.length - 1);
  });
});
