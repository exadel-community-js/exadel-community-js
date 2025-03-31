import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {filter, map, Observable, of, switchMap} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';
import {routes} from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, NgForOf, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pageTitle$!: Observable<string>;
  routes = routes;

  @ViewChild('content') content!: ElementRef<HTMLElement>;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit() {
    this.pageTitle$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        return this.route.firstChild;
      }),
      switchMap((route: ActivatedRoute | null) => route?.data || of({})),
      map((data: Data) => {
        this.content.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
        return data[Object.getOwnPropertySymbols(data)[0]];
      }));
  }
}
