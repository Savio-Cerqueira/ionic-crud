import { ClientModel } from './../core/client.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from './../core/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  saving = false;
  loading = true;
  client: ClientModel;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

    const id = this.route.snapshot.paramMap.get('id');
    this.setClient(id);
  }

  setClient(id: string) {
    this.clientService.getCLientById(id).toPromise()
      .then(
        (okRes) => {
          const userData = okRes;
          this.client = userData;
          this.form.get('name').setValue(userData.name);
          this.form.get('email').setValue(userData.email);
          this.form.get('phone').setValue(userData.phone);
          this.form.get('cell_phone').setValue(userData.cell_phone);
          this.form.get('birthday').setValue(userData.birthday);
          this.loading = false;
        },
        (failRes) => {
          this.loading = false;
          this.client = failRes;
        }
      );
  }

  onChange(event) {
    const value: string = event.target.value;
    this.client.birthday = this.formatDate(value);
  }

  private formatDate(date: string) {
    return date.split('T')[0].split('-').reverse().join('/');
  }

  async submit() {
    this.saving = true;
    const body = {...this.client};
    await this.clientService.editClient({...body}, body.id).toPromise()
      .then(
        () => {
          this.saving = false;
          console.log('edit success');
        },
        (failure) => {
          this.saving = false;
          console.error(failure);
        }
      );
  }

}
