import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {saveAs} from 'file-saver';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-bucket-detail',
  templateUrl: './bucket-detail.component.html',
  styleUrls: ['./bucket-detail.component.css']
})
export class BucketDetailComponent implements OnInit {
  name:any;
  closeResult:string;
  Detail: any = [];
  fileName:any;
  res:any;
  faDownload = faDownload;
  faTrashAlt = faTrashAlt;
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) =>{
      console.log(params.get('name'))
      this.name = params.get('name')
    })
    console.log(this.actRoute.snapshot.params.name);

    this.restApi.getBucketDetail(this.name).subscribe((data: {})=>{
      this.Detail = data;
    })
  }

  download(file:string){
    this.restApi.downloadFile(this.name,file).subscribe(data=>{
      saveAs(data,file)
    })
  }

  confirm(content: any, file:string){
    this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'}).result.then((result)=>{
      this.closeResult = `Closed with: ${result}`;
      if(result==='yes'){
        this.delete(file);
      }
    }, (reason)=>{
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })
  }
  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }  

  delete(file:string){
    this.restApi.deleteFile(this.name,file).subscribe((data: {})=>{
      this.res = data;
    })
    window.location.reload()
  }



}
