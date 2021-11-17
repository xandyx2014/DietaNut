import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalculoDieteticoPage } from './calculo-dietetico.page';

describe('CalculoDieteticoPage', () => {
  let component: CalculoDieteticoPage;
  let fixture: ComponentFixture<CalculoDieteticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculoDieteticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculoDieteticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
