import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemgraphWithQueryComponent } from './memgraph-with-query.component';

describe('MemgraphWithQueryComponent', () => {
  let component: MemgraphWithQueryComponent;
  let fixture: ComponentFixture<MemgraphWithQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemgraphWithQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemgraphWithQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
