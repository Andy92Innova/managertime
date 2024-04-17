import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskModalComponent } from './new-task-modal.component';

describe('NewTaskModalComponent', () => {
  let component: NewTaskModalComponent;
  let fixture: ComponentFixture<NewTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
