import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreasingComponent } from './increasing.component';

describe('IncreasingComponent', () => {
  let component: IncreasingComponent;
  let fixture: ComponentFixture<IncreasingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncreasingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
