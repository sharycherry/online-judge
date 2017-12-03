import { Problem } from '../models/problem.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: HttpClient) {
  }
  getProblems(): Observable<Problem[]> {
    // const headers = new Headers({'Content-Type': 'application/json'});
    this.http.get('http://localhost:3000/api/v1/problems')
      .subscribe((res: Problem[]) => {
          this.problemsSource.next(res);
       });
    return this.problemsSource.asObservable(); 
  }
  getProblem(id : number) : Promise<Problem> {
    return this.http.get(`http://localhost:3000/api/v1/problems/${id}`)
      .toPromise()
      .then( (res : Problem) => {
        return res;
      })
      .catch(this.handleError);
  }

  addProblem(problem : Problem) : void {
    this.http.post('http://localhost:3000/api/v1/problems', problem, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .toPromise()
      .then((res : Problem) => {
        this.getProblems();
      })
      .catch(this.handleError);
  }
  private handleError(error : any) : Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.body || error);
  }


  // getProblem(id: number): Problem {
  // 	return this.problems.find(problem => problem.id == id);
  // }

  // addProblem(problem: Problem) {
  // 	problem.id = this.problems.length + 1;
  // 	this.problems.push(problem);
  	
  // }
}



