import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCacheableComponent } from './angular-cacheable.component';

describe('AngularCacheableComponent', () => {
  let component: AngularCacheableComponent;
  let fixture: ComponentFixture<AngularCacheableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularCacheableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularCacheableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
