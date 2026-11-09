import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CommentService } from './comment';

describe('Comment', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
