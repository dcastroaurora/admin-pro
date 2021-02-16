import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnDestroy {
  title: string = '';
  titleSubs$: Subscription = new Subscription();

  constructor(private router: Router) {
    this.titleSubs$ = this.setTitleRoute().subscribe((data) => {
      this.title = data.title;
      document.title = `AminPro ${data.title}`;
    });
  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  setTitleRoute() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      map((event) => event as ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
