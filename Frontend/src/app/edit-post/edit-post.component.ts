import { Component } from '@angular/core';
import { Post } from '../shared/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { FileUploadService } from '../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileDetails } from '../shared/fileDetails';
import { uploadUrl } from '../shared/uploadUrl';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  cities: string[] = ['Tunis', 'Sfax', 'Sousse', 'Bizerte', 'Gabes', 'Nabeul', 'Kairouan', 'Gafsa', 'Ariana', 'Kasserine', 'Monastir', 'Ben Arous', 'Médenine', 'Manouba', 'Mahdia', 'La Marsa', 'Sidi Bouzid', 'Tataouine', 'Zarzis', 'Jendouba', 'El Kef', 'Hammamet', 'Tozeur', 'Douz', 'Marsa Matruh'];

  post: Post;
  filesToUpload?: File[] =[];
  currentFile?: File;
  progress = 0;
  message = '';

  file!: File;
  fileDetails!: FileDetails[];
  fileUris: Array<string> = [];

  constructor(private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      result => {
        const id = result.get('id');
        if (id !== '-1') {
          this.initPost(id);
        } else {
          this.post = new Post()
        }
      }
    );
  }

  initPost(id): void {
    this.postService.getPostById(id)
      .subscribe(post => {
        this.post = post;
      });
  }
  onAddPost(): void {
    if (this.filesToUpload.length > 0) {
      this.mapFilesToUrls();
    }
    if (!this.post.id) {
      this.postService.addPost(this.post).subscribe((post: Post) => {
        this.post.id = post.id;
        if (this.filesToUpload.length > 0) {
          this.uploadFiles(this.post.id, this.filesToUpload);
          this.router.navigateByUrl('');
        } else {
          this.router.navigateByUrl('');
        }
      });
    } else {
      this.postService.updatePost(this.post).subscribe((updatedPost: Post) => {
        console.log(updatedPost);
        this.post.id = updatedPost.id;
        if (this.filesToUpload.length > 0) {
          this.uploadFiles(this.post.id, this.filesToUpload);
          this.router.navigateByUrl('/post/' + updatedPost.id);
        } else {
          this.router.navigateByUrl('/post/' + updatedPost.id);
        }

      });
    }
  }

  private mapFilesToUrls(): void {
    const filesArray = Array.from(this.filesToUpload);
    this.post.photos = filesArray.map(file => 'http://localhost:8085/image/' + file.name);

  }


  uploadFiles(postId: number, files: File[]): void {
    for (const file of files) {
      this.fileUploadService.upload(postId, file).subscribe({
        next: (data) => {
          this.fileDetails = data;
          alert("Files Uploaded Successfully");
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }




  onFileSelected(event: any): void {
    this.filesToUpload = event.target.files;
  }


  onTypeChange(event: any) {
    console.log('Selected type:', event);
    if (event === 'Land') {
      this.post.numberRooms = null;
    }
  }

}

