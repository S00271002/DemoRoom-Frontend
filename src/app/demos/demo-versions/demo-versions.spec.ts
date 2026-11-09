import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoVersions } from './demo-versions';

describe('DemoVersions', () => {
  let component: DemoVersions;
  let fixture: ComponentFixture<DemoVersions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoVersions],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoVersions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
