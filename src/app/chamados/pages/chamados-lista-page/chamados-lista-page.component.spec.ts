import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ChamadosListaPageComponent } from './chamados-lista-page.component';

describe('ChamadosListaPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadosListaPageComponent],
      providers: [provideRouter([]), provideNoopAnimations(), MessageService]
    }).compileComponents();
  });

  it('should render the summary and the initial chamados list', () => {
    const fixture = TestBed.createComponent(ChamadosListaPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Chamados corporativos em um só lugar');
    expect(compiled.textContent).toContain('Notebook sem conexão com a VPN');
    expect(compiled.textContent).toContain('Editar');
    expect(compiled.textContent).toContain('Excluir');
  });
});
