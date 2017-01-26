import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { NewGoalAnimations } from './new-goal.animations';
import { UsersService } from '../shared/services/users.service';
import { GoalsService } from '../shared/services/goals.service';
import { IUser } from '../shared/interfaces/user.interface';

@Component({
  selector: 'new-goal',
  templateUrl: 'new-goal.component.html',
  styleUrls: ['new-goal.component.scss'],
  animations: NewGoalAnimations
})
export class NewGoalComponent implements OnInit, OnDestroy {
  newGoalState: string = 'loading';
  isCreatingGoal: boolean = false;
  newGoalForm: FormGroup;
  newGoalErrors = [];

  constructor(
    private _usersService: UsersService,
    private _goalsService: GoalsService,
    private _router: Router,
    private _formBuilder: FormBuilder) {
    this.newGoalForm = _formBuilder.group({
      'img': [null],
      'name': [null, Validators.required],
      'description': [null, Validators.required],
      'category': [null, Validators.required],
      'hashtags': [null, Validators.required],
      'location': [null]
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.newGoalState = 'loaded';
    }, 800);
  }

  ngOnDestroy() {
    this.newGoalState = 'destroyed';
  }

  submitForm(formData: any): void {
    this.isCreatingGoal = true;
    let newGoal = this.mapFormData(formData);
    this._goalsService.createNewGoal(newGoal)
      .subscribe((data) => {
        if (!data.success) {
          this.isCreatingGoal = false;
          console.error(data.errMsg);
          return;
        }
        console.log(JSON.stringify(data));

        this._usersService.addGoalById(data.goal._id)
          .subscribe((data) => {
            if (!data.success) {
              this.isCreatingGoal = false;
              console.error(data.errMsg);
              return;
            }
            console.log(JSON.stringify(data));
            this.isCreatingGoal = false;
            this.newGoalForm.reset();
            // this._router.navigate(['user-profile']);
          },
          (err) => {
            this.isCreatingGoal = false;
            this.newGoalErrors.push(err)
          });
      },
      (err) => {
        this.isCreatingGoal = false;
        this.newGoalErrors.push(err)
      });
  }

  mapFormData(formData) {
    let goal = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      hashtags: formData.hashtags,
      location: formData.password,
      media: {
        img: formData.img
      }
    }

    if (typeof formData.hashtags === "string") {
      goal.hashtags = formData.hashtags.split(',');
    }
    return goal;
  }
}
