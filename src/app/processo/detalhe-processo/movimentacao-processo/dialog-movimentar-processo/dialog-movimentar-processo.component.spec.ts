import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMovimentarProcessoComponent } from './dialog-movimentar-processo.component';

describe('DialogMovimentarProcessoComponent', () => {
  let component: DialogMovimentarProcessoComponent;
  let fixture: ComponentFixture<DialogMovimentarProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMovimentarProcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMovimentarProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
