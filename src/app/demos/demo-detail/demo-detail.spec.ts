import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoDetail } from './demo-detail';

describe('DemoDetail', () => {
  let component: DemoDetail;
  let fixture: ComponentFixture<DemoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
