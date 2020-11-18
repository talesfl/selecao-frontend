import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDocumentoComponent } from './categoria-documento.component';

describe('CategoriaDocumentoComponent', () => {
  let component: CategoriaDocumentoComponent;
  let fixture: ComponentFixture<CategoriaDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
