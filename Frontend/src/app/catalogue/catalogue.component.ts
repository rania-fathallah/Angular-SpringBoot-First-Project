import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../shared/post';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  showFilter: boolean = false;
  isDropdownOpen: boolean = false;
  cities: string[];

  category: string = null;
  offer: string = null;
  numberOfRooms: number = null;
  selectedCities: { [key: string]: boolean } = {};
  minPrice: number = null;
  maxPrice: number = null;

  errMess: string;
  isWaiting: boolean = true;
  orgPosts: Post[];
  posts: Post[];

  isAuth = false;
  authSubscription: Subscription;

  public constructor(private router: Router, private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe({
        next: (posts) => { this.posts = posts; this.orgPosts = posts; console.log(posts); this.isWaiting = false; this.cities = this.extractCities(posts); },
        error: (errmess) => {
          this.posts = [];
          this.errMess = <any>errmess; this.isWaiting = false;
        },
        complete: () => { console.log("complete" + this.isWaiting); }
      });

    this.authSubscription = this.authService.authSubject.subscribe(
      (isAuth: boolean) => { this.isAuth = isAuth; });
    this.authService.emitAuthSubject();
  }
  onDelete(id: number) {
    this.postService.deletePostById(id)
      .subscribe({
        next: (posts) => {
          console.log("post deleted!");
          let index = this.posts.findIndex(post => post.id == id)
          this.posts.splice(index, 1);
        },
        error: (errmess) => { console.log(errmess) }
      });
  }

  onAddPost() {
    this.router.navigateByUrl('/post/edit/-1');
  }

  toggleFilterBox() {
    this.showFilter = !this.showFilter;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  private extractCities(posts: any[]): string[] {
    const citiesSet: Set<string> = new Set();
    posts.forEach(post => {
      citiesSet.add(post.city);
    });
    return Array.from(citiesSet);
  }

  applyFilter() {
    this.posts = this.orgPosts.filter(post => {
      // Filter by category
      if (this.category && post.type !== this.category) {
        return false;
      }

      // Filter by offer
      if (this.offer && post.offer !== this.offer) {
        return false;
      }

      // Filter by number of rooms
      if (this.numberOfRooms && post.numberRooms !== this.numberOfRooms) {
        return false;
      }

      // Filter by selected cities
      if (Object.values(this.selectedCities).some(city => city) &&
        !this.selectedCities[post.city]) {
        return false;
      }

      // Filter by price range
      if ((this.minPrice && post.price < this.minPrice)) {
        return false;
      }
      if ((this.maxPrice && post.price > this.maxPrice)) {
        return false;
      }

      return true;
    });
  }

  updateSelectedCities(city: string, event: any) {
    const checked = event.target.checked;
    this.selectedCities[city] = checked;
  }
  resetInputs() {
    this.category = null;
    this.offer = null;
    this.numberOfRooms = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedCities = {};
    this.posts = this.orgPosts;
  }

  isFilterDisabled(): boolean {
    if (this.minPrice && this.maxPrice && (this.minPrice > this.maxPrice || this.maxPrice < this.minPrice)) {
      return true;
    }
    return false;
  }
  
}
