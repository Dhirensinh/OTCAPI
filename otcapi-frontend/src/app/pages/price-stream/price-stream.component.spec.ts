import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceStreamComponent } from './price-stream.component';

describe('PriceStreamComponent', () => {
  let component: PriceStreamComponent;
  let fixture: ComponentFixture<PriceStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
