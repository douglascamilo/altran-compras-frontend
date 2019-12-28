import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoNovoComponent } from './carrinho-novo.component';

describe('CarrinhoNovoComponent', () => {
  let component: CarrinhoNovoComponent;
  let fixture: ComponentFixture<CarrinhoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
