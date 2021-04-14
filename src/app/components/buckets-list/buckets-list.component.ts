import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buckets-list',
  templateUrl: './buckets-list.component.html',
  styleUrls: ['./buckets-list.component.css']
})
export class BucketsListComponent implements OnInit {

  Bucket: any = [];
  faEye = faEye;
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadBuckets()
  }

  loadBuckets(){
    return this.restApi.getBuckets().subscribe((data: {}) => {
      this.Bucket = data;
      console.log(this.Bucket);
    })
  }

}
