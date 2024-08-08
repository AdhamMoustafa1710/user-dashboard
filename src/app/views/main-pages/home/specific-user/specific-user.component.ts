import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/core/services/general.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { User } from '@app/core/models/users.model.js';



@Component({
    selector: 'app-specific-user',
    templateUrl: './specific-user.component.html',
    styleUrls: [ './specific-user.component.scss' ]
})
export class SpecificUserComponent implements OnInit, OnDestroy {
    private subs = new Subscription();
    user!: User;
    isLoading: boolean = false

    constructor(
        private generalService: GeneralService,
        private route: ActivatedRoute,
        public _location: Location,

    ) {
        this.isLoading = true
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe()
    }
    ngOnInit(): void {
        this.isLoading = true
        this.subs.add(
            this.route.params.subscribe(params => {
                const id = +params[ 'id' ];
                this.getUser(id);

            })
        );
    }

    getUser(id: any) {
        this.isLoading = true
        this.subs.add(
            this.generalService.getUser(id).subscribe({
                next: (res) => {
                    if (res)
                        this.user = res.data
                    this.isLoading = false
                }
            })
        );
    }

}