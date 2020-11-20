import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoProcessoComponent } from './documento-processo.component';

describe('DocumentoProcessoComponent', () => {
  let component: DocumentoProcessoComponent;
  let fixture: ComponentFixture<DocumentoProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoProcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
