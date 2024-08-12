import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../shared/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {
  idPost:  any;
  post: Post;
  constructor(private postService: PostService,
              private route : ActivatedRoute, 
              private router:Router,
              @Inject('UploadURL')public uploadUrl:string){}
  ngOnInit(): void {
      this.route.paramMap.subscribe(res=>{this.idPost=res.get('id');})
     this.postService.getPostById(this.idPost).subscribe((post)=>this.post=post);
  }
  onPosts(){
    this.router.navigateByUrl('')
  }
}
