import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSalvarDocumentoComponent } from './dialog-salvar-documento.component';

describe('DialogSalvarDocumentoComponent', () => {
  let component: DialogSalvarDocumentoComponent;
  let fixture: ComponentFixture<DialogSalvarDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSalvarDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSalvarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
