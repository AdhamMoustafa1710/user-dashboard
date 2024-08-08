import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from '@app/core/services/general.service';
import { User } from '@models/users.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private subs = new Subscription();
  loading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;
  allResultsLoaded: boolean = false;
  showMaxResultsMessage: boolean = false;
  private lastScrollTop: number = 0;

  constructor(
    private generalService: GeneralService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  @HostListener('window:scroll', [ '$event' ])
  onScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      // Scrolling down
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !this.allResultsLoaded) {
        this.getUsers();
      }
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  getUsers() {
    if (this.loading || this.currentPage > this.totalPages) return;

    this.loading = true;
    this.subs.add(
      this.generalService.getAllUsers(this.currentPage).subscribe({
        next: (res) => {
          this.users = [ ...this.users, ...res.data ];
          this.totalPages = res.total_pages;
          this.currentPage++;
          this.loading = false;

          if (this.currentPage > this.totalPages) {
            this.allResultsLoaded = true;
            this.showMaxResultsMessageCard();
          }
        },
        error: () => {
          this.loading = false;
        }
      })
    );
  }

  showMaxResultsMessageCard() {
    this.showMaxResultsMessage = true;
    setTimeout(() => {
      this.showMaxResultsMessage = false;
    }, 5000);
  }

  onUserClick(user: any) {
    this.router.navigate([ '/user', user.id ]);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}