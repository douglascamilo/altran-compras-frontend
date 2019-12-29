import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoItensIncluirComponent } from './carrinho-itens-incluir.component';

describe('CarrinhoItensIncluirComponent', () => {
  let component: CarrinhoItensIncluirComponent;
  let fixture: ComponentFixture<CarrinhoItensIncluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoItensIncluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoItensIncluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
