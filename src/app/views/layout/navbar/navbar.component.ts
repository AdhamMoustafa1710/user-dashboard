import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, switchMap, takeUntil, catchError } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { GeneralService } from '@app/core/services/general.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  user: any;
  private destroy$ = new Subject<void>();
  noUser: boolean = false;
  isLoading: boolean = false
  showSearchResult: boolean = false
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  private searchCache: Map<string, any | null> = new Map();
  userNotFound: boolean = false;
  hasSearched: boolean = false;
  noSearchValue: any;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private GeneralService: GeneralService
  ) { }

  ngOnInit() {
    this.setupSearchListener();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearSearchCache()
  }

  setupSearchListener() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      switchMap(value => {
        if (value && value.trim() !== '') {
          this.isLoading = true;
          this.userNotFound = false;
          this.hasSearched = true;

          if (this.searchCache.has(value)) {
            this.isLoading = false;
            return of(this.searchCache.get(value));
          }
          return this.GeneralService.getUser(value).pipe(
            finalize(() => {
              this.isLoading = false;
            }),
            catchError((error: any) => {
              this.resetSearch();
              this.userNotFound = true;
              this.noSearchValue = true;

              // Cache the error result
              const searchValue = this.searchControl.value;
              if (searchValue !== null) {
                this.searchCache.set(searchValue, null);
              }

              return of(null);
            })
          );
        } else {
          this.resetSearch();
          return of(null);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (response: any) => {
        console.log('Response:', response);
        this.isLoading = false;
        this.hasSearched = true;

        if (response && response.data) {
          this.user = response.data;
          this.showSearchResult = true;
          this.userNotFound = false;
          // Cache the result
          const searchValue = this.searchControl.value;
          if (searchValue !== null) {
            this.searchCache.set(searchValue, response);
          }
        } else {
          this.resetSearch();
          this.userNotFound = true;
          // Cache the null result
          const searchValue = this.searchControl.value;
          if (searchValue !== null) {
            this.searchCache.set(searchValue, null);
          }
        }
      }
    );
  }


  resetSearch() {
    this.user = null;
    this.showSearchResult = false;
    this.userNotFound = false;
  }

  listenToUrlChanges() {
    this.isLoading = true
    this.route.params.pipe(
      switchMap(params => this.GeneralService.getUser(params[ 'id' ])),
      takeUntil(this.destroy$)
    ).subscribe(
      (response: any) => {
        this.user = response.data;
      },
      (error) => {
        if (error)
          this.noUser = true
      }

    );
  }

  updateUrl(userId: number) {
    this.router.navigate([ '/' ], { queryParams: { id: userId } });
  }

  onUserClick(user: any) {
    this.router.navigate([ '/user', user.id ]);
  }

  @HostListener('document:click', [ '$event' ])
  clickOutside(event: Event) {
    if (!this.searchContainer.nativeElement.contains(event.target)) {
      this.closeSearchResult();
    }
  }
  closeSearchResult() {
    this.showSearchResult = false;
    this.user = null;
    this.userNotFound = false;
    this.hasSearched = false;
  }

  clearSearchCache() {
    this.searchCache.clear();
  }
}