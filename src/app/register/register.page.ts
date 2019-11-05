import { ClientModel } from './../core/client.model';
import { ClientService } from './../core/client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  saving = false;
  client: ClientModel;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: [
          null,
          [
            Validators.required
          ]
        ],
        email: [
          null,
          [
            Validators.required
          ]
        ],
        phone: [
          null
        ],
        cell_phone: [
          null
        ],
        birthday: [
          null,
          [
            Validators.required
          ]
        ],
      }
    );
  }

  ionViewDidEnter() {
    this.client = {
      name : 'Novo Cliente',
      email : 'Email',
      phone : '000-000-0000',
      cell_phone : '+000 (000) 000-0000',
      birthday : '',
      id: ''
    };
  }

  onChange(event) {
    const value: string = event.target.value;
    this.client.birthday = this.formatDate(value);
  }

  private formatDate(date: string) {
    return date.split('T')[0].split('-').reverse().join('/');
  }

  async submitClient(form: FormGroup) {
    this.saving = true;

    const client = this.createClientFromForm(form);

    await this.clientService.addClient({...client}).toPromise()
      .then(
        () => {
          this.saving = false;
          this.form.reset();
          console.log('usuario criado com sucesso');
        },
        (failRes) => {
          this.saving = false;
          this.form.reset();
          console.error(failRes);
        }
      );

  }

  private createClientFromForm(form: FormGroup) {
    const name = form.get('name').value;
    const email = form.get('email').value;
    const phone = form.get('phone').value;
    const cell_phone = form.get('cell_phone').value;
    const birthday = form.get('birthday').value;
    const id = uuid();

    const body: ClientModel = {
      name,
      email,
      phone,
      cell_phone,
      birthday,
      id
    };

    return body;
  }

}
