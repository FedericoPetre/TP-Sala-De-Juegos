import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosJuegosComponent } from './resultados-juegos.component';

describe('ResultadosJuegosComponent', () => {
  let component: ResultadosJuegosComponent;
  let fixture: ComponentFixture<ResultadosJuegosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultadosJuegosComponent]
    });
    fixture = TestBed.createComponent(ResultadosJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
