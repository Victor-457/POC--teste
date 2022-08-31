import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
import { IdentificacaoComponent } from './identificacao.component';
import { IdentificacaoModule } from './identificacao.module';

describe(IdentificacaoComponent.name, ()=>{

  let fixture: ComponentFixture<IdentificacaoComponent> = null;
  let component: IdentificacaoComponent = null;

  beforeEach(async ()=>{

    await TestBed.configureTestingModule({
      imports: [
        IdentificacaoModule,
        ModalModule.forRoot(),
        NgxMaskModule.forRoot()
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(IdentificacaoComponent);
    component = fixture.componentInstance;

  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

});

