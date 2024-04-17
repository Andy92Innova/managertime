import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../../../../services/ManagerTime/environment.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddTaskRequest } from '../../../../models/request/task-request';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { EnvironmentModelResponse } from '../../../../models/response/environment-response';

@Component({
  selector: 'app-new-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './new-task-modal.component.html',
  styles: ``
})
export class NewTaskModalComponent implements OnInit {

  activeModal = inject(NgbActiveModal);
  private environmentService = inject(EnvironmentService);
  private formBuilder = inject(FormBuilder);

  @Output() taskAdded = new EventEmitter();

  envs: EnvironmentModelResponse[] = [];

  formNewTask: FormGroup = this.formBuilder.group({
    environment: ['', Validators.required],
    task_name: ['', [Validators.required, Validators.maxLength(20)]],
    task_description: ['', [Validators.required, Validators.maxLength(300)]],
    break_time: ['', Validators.required]
  });

  faHourglass = faHourglass;

  message: string = '';
  typeAlert: number = 0;

  ngOnInit(): void {
    this.getEnvironments();
  }

  getEnvironments(): void {
    this.environmentService.getEnvironments().subscribe({
      next: (data) => {
        this.envs = data;
      }
    });
  }

  onSubmit(): void {
    if (this.formNewTask.valid) {

      const break_time = this.getSecondsForBreak();

      const model: AddTaskRequest = {
        env_id: this.formNewTask.get('environment')?.value,
        task_id: 0,
        task_name: this.formNewTask.get('task_name')?.value,
        description: this.formNewTask.get('task_description')?.value,
        break_time: break_time
      }

      this.taskAdded.emit(model);
      this.activeModal.close();
    } else {
      this.showMsg(0, this.formNewTask.value);
    }
  }

  getSecondsForBreak(): number {
    // Suponiendo que 'timeString' es la cadena de tiempo en formato 'HH:mm:ss'
    const timeString = this.formNewTask.get('break_time')?.value;//'00:05:00'; // Ejemplo de cadena de tiempo
    console.log('value bteak:', timeString);
    // Dividir la cadena en horas, minutos y segundos
    // const [horas, minutos, segundos] = timeString.split(':');
    const [horas, minutos] = timeString.split(':');

    // Convertir horas, minutos y segundos a números enteros
    const horasInt = parseInt(horas);
    const minutosInt = parseInt(minutos);
    // const segundosInt = parseInt(segundos);

    // Calcular el total de segundos
    const totalSegundos = horasInt * 3600 + minutosInt * 60;

    console.log('Total de segundos:', totalSegundos); // Output: Total de segundos: 300
    return totalSegundos;
  }

  showMsg(type: number, msg: string): void {
    this.typeAlert = type;
    this.message = msg;
  }


}
