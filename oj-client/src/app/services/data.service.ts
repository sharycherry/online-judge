import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http, Response, Headers } from '@angular/http';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http : HttpClient) { }

  getProblems() : Observable<Problem[]> {
    this.http.get("api/v1/problems")
      .subscribe((res : Problem[]) => {
        this.problemsSource.next(res);
      });

    return this.problemsSource.asObservable();
  }

  getProblem(id : number) : Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
      .toPromise()
      .then( (res : Problem) => {
        return res;
      })
      .catch(this.handleError);
  }

  addProblem(problem : Problem) : void {
    this.http.post('/api/v1/problems', problem, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .toPromise()
      .then((res : Problem) => {
        this.getProblems();
      })
      .catch(this.handleError);
  }

  // error hanlder
  private handleError(error : any) : Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.body || error);
  }

  buildAndRun(data): Promise<Object> {
    console.log('here');
    return this.http.post('/api/v1/build_and_run', data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
                    .toPromise()
                    .then((res: Object) => {
                      console.log(res);
                      return res;
                    })
                    .catch(this.handleError);
  }
}
