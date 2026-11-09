import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentList } from './comment-list';
import { of } from 'rxjs';
import { CommentService } from '../../services/comment';

describe('CommentList', () => {
  let component: CommentList;
  let fixture: ComponentFixture<CommentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentList],
      providers: [{ provide: CommentService, useValue: { getComments: () => of([]) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentList);
    fixture.componentRef.setInput('demoId', 'test-demo');
    fixture.componentRef.setInput('versionNumber', 1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
