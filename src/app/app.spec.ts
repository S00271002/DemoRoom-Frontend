import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.removeItem('demoroom-theme');
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.removeItem('demoroom-theme');
    delete document.documentElement.dataset['theme'];
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('DemoRoom');
  });

  it('switches themes and restores the saved choice when recreated', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const toggle = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(toggle.checked).toBe(false);
    expect(document.documentElement.dataset['theme']).toBe('light');

    toggle.click();
    await fixture.whenStable();
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('demoroom-theme')).toBe('dark');
    fixture.destroy();

    const reopened = TestBed.createComponent(App);
    await reopened.whenStable();
    const reopenedToggle = reopened.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(reopenedToggle.checked).toBe(true);
    expect(document.documentElement.dataset['theme']).toBe('dark');

    reopenedToggle.click();
    await reopened.whenStable();
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem('demoroom-theme')).toBe('light');
  });
});
