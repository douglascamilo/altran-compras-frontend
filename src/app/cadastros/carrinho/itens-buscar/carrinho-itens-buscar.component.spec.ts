import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoItensBuscarComponent } from './carrinho-itens-buscar.component';

describe('CarrinhosItensBuscarComponent', () => {
  let component: CarrinhoItensBuscarComponent;
  let fixture: ComponentFixture<CarrinhoItensBuscarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoItensBuscarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoItensBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
