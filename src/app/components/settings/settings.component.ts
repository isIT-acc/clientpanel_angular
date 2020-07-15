import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  constructor(
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private setsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.settings = this.setsService.getSettings();
  }

  onSubmit() {
    this.setsService.changeSettings(this.settings);
    this.flashMessageService.show('Settings saved', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }
}
