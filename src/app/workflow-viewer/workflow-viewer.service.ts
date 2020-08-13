import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from '../services/utility.service';

@Injectable()
export class WorkflowViewerService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(public utility: UtilityService) { }

  setMessage(message: string) {
    this.messageSource.next(message)
  }

}