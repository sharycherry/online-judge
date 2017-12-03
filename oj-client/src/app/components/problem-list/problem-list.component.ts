import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];
  // problem: Problem;
  constructor(private data: DataService) { }

  // ngOnInit() {
  // 	console.log('hi' + typeof this.data.getProblems());
  // 	this.problems = this.data.getProblems();
  // }

  ngOnInit() {
    this.getProblems();
  }
  getProblems() : void {
    this.data.getProblems()
      .subscribe(problems => this.problems = problems);
  }
}
