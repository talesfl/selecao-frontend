import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVizualizarDocumentoComponent } from './dialog-vizualizar-documento.component';

describe('DialogVizualizarDocumentoComponent', () => {
  let component: DialogVizualizarDocumentoComponent;
  let fixture: ComponentFixture<DialogVizualizarDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVizualizarDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVizualizarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
