import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdecComponent } from './adec.component';

describe('AdecComponent', () => {
  let component: AdecComponent;
  let fixture: ComponentFixture<AdecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdecComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
