import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BucketsListComponent } from './components/buckets-list/buckets-list.component';
import { BucketDetailComponent} from './components/bucket-detail/bucket-detail.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listBuckets'},
  { path: 'listBuckets', component: BucketsListComponent},
  { path: 'bucketDetail/:name', component: BucketDetailComponent},
  { path: 'bucketDetail/:name/uploadImage', component: UploadImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
