import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/Router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disableBalanceOnAdd: boolean = this.settingsService.getSettings()
    .disableBalanceOnAdd;

  @ViewChild('clientForm') form: any;
  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {}
  // onSubmit(f: NgForm) {
  //   // console.log()
  // }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger text-center',
        timeout: 4000,
      });
    } else {
      // Add new client
      this.clientService.addNewClient(value);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success text-center',
        timeout: 4000,
      });
      // Redirect to dash
      this.router.navigate(['/']);
    }
  }
}
