import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VMensagemComponent } from './v-mensagem.component';

describe('VMensagemComponent', () => {
  let component: VMensagemComponent;
  let fixture: ComponentFixture<VMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
