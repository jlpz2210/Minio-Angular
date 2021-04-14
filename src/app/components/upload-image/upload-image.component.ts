import { Component, OnInit} from '@angular/core';  
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  form: FormGroup;
  name: any;
  apiURL = "http://localhost:3000"
  res:any;
  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    public actRoute: ActivatedRoute
    ) {
      this.form = this.fb.group({
        img: [null]
      })
    }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) =>{
      console.log(params.get('name'))
      this.name = params.get('name')
    })
  }

  upload(event:any){
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      img: file
    });
    this.form.get('img')?.updateValueAndValidity();
  }

  submit(){
    var formData: any = new FormData();
    formData.append("img", this.form.get('img')!.value);
    return this.http.post(this.apiURL+"/bucketDetail/"+this.name+"/uploadImage",formData).subscribe(
      (response: {}) => {this.res = response},
      (error) => console.log(error)
    )
  }

}
