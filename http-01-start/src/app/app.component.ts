import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postService.creteNewPost(postData).subscribe(resp => {
      //console.log(resp);
      this.getPosts();
    })
  }

  onFetchPosts() {
    this.getPosts();
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.getPosts();
      //this.loadedPosts = [];
    })
  }

  private getPosts() {
    this.isFetching = true;
    this.postService.getPosts().subscribe(resp => {
      this.isFetching = false;
      this.loadedPosts = resp;
    })
  }
}
