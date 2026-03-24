import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:5000/api/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createJob(job: any): Observable<any> {
    return this.http.post(this.apiUrl, job);
  }

  updateJob(id: string, job: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }
}