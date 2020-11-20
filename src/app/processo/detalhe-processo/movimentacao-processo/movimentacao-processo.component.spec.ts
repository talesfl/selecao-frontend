import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoProcessoComponent } from './movimentacao-processo.component';

describe('MovimentacaoProcessoComponent', () => {
  let component: MovimentacaoProcessoComponent;
  let fixture: ComponentFixture<MovimentacaoProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimentacaoProcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacaoProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
