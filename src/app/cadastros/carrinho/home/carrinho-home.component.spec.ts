import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoHomeComponent } from './carrinho-home.component';

describe('CarrinhoHomeComponent', () => {
  let component: CarrinhoHomeComponent;
  let fixture: ComponentFixture<CarrinhoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
