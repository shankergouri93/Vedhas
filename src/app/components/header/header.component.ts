import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@app/pages/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  showLogOut: boolean = false;
  constructor(private router: Router, private loginService: LoginService) {}
  signout() {
    this.loginService.LogoutUser();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.loginService.IsLoggedIn.subscribe((x) => {
      this.showLogOut = x;
    });
  }
}
