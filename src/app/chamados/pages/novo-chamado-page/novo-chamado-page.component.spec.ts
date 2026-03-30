import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ChamadosService } from '../../services/chamados.service';
import { NovoChamadoPageComponent } from './novo-chamado-page.component';

describe('NovoChamadoPageComponent', () => {
  const activatedRouteStub = {
    snapshot: {
      paramMap: convertToParamMap({})
    }
  };

  beforeEach(async () => {
    activatedRouteStub.snapshot.paramMap = convertToParamMap({});

    await TestBed.configureTestingModule({
      imports: [NovoChamadoPageComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }
      ]
    }).compileComponents();
  });

  it('should keep the form invalid until all required fields are filled', async () => {
    const fixture = TestBed.createComponent(NovoChamadoPageComponent);
    const component = fixture.componentInstance;
    const chamadosService = TestBed.inject(ChamadosService);
    const messageService = TestBed.inject(MessageService);

    spyOn(chamadosService, 'criarChamado').and.callThrough();
    spyOn(messageService, 'add');

    await component.salvarChamado();
    fixture.detectChanges();

    expect(component.chamadoForm.invalid).toBeTrue();
    expect(component.chamadoForm.controls.titulo.touched).toBeTrue();
    expect(chamadosService.criarChamado).not.toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ severity: 'warn' })
    );
    expect(fixture.nativeElement.textContent).toContain('Informe um título válido para o chamado.');
  });

  it('should create a chamado and redirect to the list when the form is valid', async () => {
    const fixture = TestBed.createComponent(NovoChamadoPageComponent);
    const component = fixture.componentInstance;
    const chamadosService = TestBed.inject(ChamadosService);
    const messageService = TestBed.inject(MessageService);
    const router = TestBed.inject(Router);

    spyOn(chamadosService, 'criarChamado').and.callThrough();
    spyOn(messageService, 'add');
    spyOn(router, 'navigate').and.resolveTo(true);

    component.chamadoForm.setValue({
      titulo: '  Atualizar cadastro no ERP  ',
      descricao: '  Usuário sem acesso ao novo módulo financeiro.  ',
      categoria: 'Acesso'
    });

    await component.salvarChamado();

    expect(chamadosService.criarChamado).toHaveBeenCalledWith({
      titulo: 'Atualizar cadastro no ERP',
      descricao: 'Usuário sem acesso ao novo módulo financeiro.',
      categoria: 'Acesso'
    });
    expect(messageService.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ severity: 'success' })
    );
    expect(router.navigate).toHaveBeenCalledWith(['/chamados']);
  });

  it('should load the chamado data and update it in edit mode', async () => {
    activatedRouteStub.snapshot.paramMap = convertToParamMap({ id: '1048' });

    const fixture = TestBed.createComponent(NovoChamadoPageComponent);
    const component = fixture.componentInstance;
    const chamadosService = TestBed.inject(ChamadosService);
    const messageService = TestBed.inject(MessageService);
    const router = TestBed.inject(Router);

    spyOn(chamadosService, 'atualizarChamado').and.callThrough();
    spyOn(messageService, 'add');
    spyOn(router, 'navigate').and.resolveTo(true);

    expect(component.modoEdicao).toBeTrue();
    expect(component.chamadoForm.controls.titulo.value).toBe('Notebook sem conexão com a VPN');

    component.chamadoForm.setValue({
      titulo: 'VPN intermitente',
      descricao: 'Conexão cai ao acessar o ambiente interno fora do escritório.',
      categoria: 'Rede'
    });

    await component.salvarChamado();

    expect(chamadosService.atualizarChamado).toHaveBeenCalledWith(1048, {
      titulo: 'VPN intermitente',
      descricao: 'Conexão cai ao acessar o ambiente interno fora do escritório.',
      categoria: 'Rede'
    });
    expect(messageService.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ summary: 'Chamado atualizado' })
    );
    expect(router.navigate).toHaveBeenCalledWith(['/chamados']);
  });
});
