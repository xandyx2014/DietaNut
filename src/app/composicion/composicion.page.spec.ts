import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComposicionPage } from './composicion.page';

describe('ComposicionPage', () => {
  let component: ComposicionPage;
  let fixture: ComponentFixture<ComposicionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposicionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComposicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
