import { Component, EventEmitter, Input, OnInit, Output, inject, output } from '@angular/core';
import { faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../../../../services/ManagerTime/environment.service';
import { AddEnvironmentRequest } from '../../../../models/request/environment-request';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnvironmentModelResponse } from '../../../../models/response/environment-response';

@Component({
  selector: 'app-new-environment-modal',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './new-environment-modal.component.html',
  styles: ``
})
export class NewEnvironmentModalComponent implements OnInit {

  activeModal = inject(NgbActiveModal);
  private environmentService = inject(EnvironmentService);

  faList = faList;
  faTrash = faTrash;

  envName: string = '';
  message: string = '';
  typeAlert: number = 0; //1-Error , 0-Info
  data: EnvironmentModelResponse[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.getEnvironemtns();
  }

  save(): void {
    if (this.envName.trimEnd() !== '' && RegExp('[A-Za-z]').test(this.envName)) {

      this.message = '';

      const model: AddEnvironmentRequest = {
        user_id: 1,
        name: this.envName
      }


      this.environmentService.addEnvironment(model).subscribe({
        next: (result) => {
          this.showMsg(0, result.message);
          this.envName = '';
          if (result.was_inserted) {
            this.getEnvironemtns();
          }
        },
        error: (err) => this.showMsg(1, err)
      });
    }
    else {
      this.showMsg(0, 'You must to add a env name to save');
    }
  }

  delete(env_id: number): void {
    this.environmentService.deleteEnvironment(env_id).subscribe({
      next: (data) => {
        this.showMsg(0, data.message);
        this.getEnvironemtns();
      }
    });
  }

  getEnvironemtns(): void {
    this.environmentService.getEnvironments().subscribe({
      next: (data) => this.data = data,
      error: (err) => this.showMsg(1, err)
    })
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.save();
    }
  }

  showMsg(type: number, msg: string): void {
    this.typeAlert = type;
    this.message = msg;

  }

}
