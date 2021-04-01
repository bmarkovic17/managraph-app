import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemgraphComponent } from './memgraph.component';

describe('MemgraphComponent', () => {
  let component: MemgraphComponent;
  let fixture: ComponentFixture<MemgraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemgraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
