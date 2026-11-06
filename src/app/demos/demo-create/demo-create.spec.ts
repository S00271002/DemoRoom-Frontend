import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoCreate } from './demo-create';

describe('DemoCreate', () => {
  let component: DemoCreate;
  let fixture: ComponentFixture<DemoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
