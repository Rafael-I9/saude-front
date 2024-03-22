import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConvenioComboComponent } from './convenio-combo.component';

describe('ConvenioComboComponent', () => {
  let component: ConvenioComboComponent;
  let fixture: ComponentFixture<ConvenioComboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvenioComboComponent],
    });
    fixture = TestBed.createComponent(ConvenioComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
