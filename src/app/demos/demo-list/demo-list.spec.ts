import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoList } from './demo-list';

describe('DemoList', () => {
  let component: DemoList;
  let fixture: ComponentFixture<DemoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoList],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
