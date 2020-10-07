import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntercambioPage } from './intercambio.page';

describe('IntercambioPage', () => {
  let component: IntercambioPage;
  let fixture: ComponentFixture<IntercambioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntercambioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntercambioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
