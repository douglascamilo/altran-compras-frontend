import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoItensComponent } from './carrinho-itens.component';

describe('CarrinhoItensComponent', () => {
  let component: CarrinhoItensComponent;
  let fixture: ComponentFixture<CarrinhoItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
