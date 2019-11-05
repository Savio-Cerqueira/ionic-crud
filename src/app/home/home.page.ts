import { ClientModel } from './../core/client.model';
import { ClientService } from './../core/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  clientList: Array<ClientModel>;
  loading = false;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCLients();
  }

  ionViewDidEnter() {
    this.getCLients();
  }

  getCLients() {
    this.loading = true;
    this.clientService.getClients().toPromise()
      .then(
        (okRes) => {
          this.loading = false;
          this.clientList = okRes;
        },
        (failRes) => {
          this.loading = false;2
          console.error(failRes);
        }
      );
  }

  deleteClient(id: string) {
    this.loading = true;
    this.clientService.deleteClient(id).toPromise()
      .then(
        (okRes) => {
          this.loading = false;
          this.getCLients();
          console.log('deletado : ', okRes);
        },
        (failRes) => {
          this.loading = false;
          console.log('deletado : ', failRes);
        }
      );

  }

  selectClient(id: string) {
    this.router.navigate(['/client', id]);
  }

}
