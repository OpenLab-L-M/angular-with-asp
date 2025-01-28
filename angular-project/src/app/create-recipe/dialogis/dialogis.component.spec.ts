import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogisComponent } from './dialogis.component';

describe('DialogisComponent', () => {
  let component: DialogisComponent;
  let fixture: ComponentFixture<DialogisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
