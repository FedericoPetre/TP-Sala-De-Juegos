import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentraElTesoroComponent } from './encuentra-el-tesoro.component';

describe('EncuentraElTesoroComponent', () => {
  let component: EncuentraElTesoroComponent;
  let fixture: ComponentFixture<EncuentraElTesoroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuentraElTesoroComponent]
    });
    fixture = TestBed.createComponent(EncuentraElTesoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
