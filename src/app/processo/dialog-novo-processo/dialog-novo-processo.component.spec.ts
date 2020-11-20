import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNovoProcessoComponent } from './dialog-novo-processo.component';

describe('DialogNovoProcessoComponent', () => {
  let component: DialogNovoProcessoComponent;
  let fixture: ComponentFixture<DialogNovoProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNovoProcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNovoProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
