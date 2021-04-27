import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import images from './defaultimage.json';

@Component({
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  isEditable = false;
  image: string | undefined = '';
  loginForm = new FormGroup({
    firstname: new FormControl('My First Name', [Validators.required]),
    lastname: new FormControl('My Last Name', [Validators.required]),
    // profilepicture: new FormControl('My Last Name', [Validators.required]),
  });
  accounts: string = '';
  balances: string = '';
  output: string = '';
  constructor() {
    this.image = images[0].image;
  }
  onEdit() {
    if (this.loginForm.valid) {
    }
    this.isEditable = !this.isEditable;
  }
  onCancel() {
    this.isEditable = false;
  }
  upload(event: any) {
    var file = event.srcElement.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      console.log('RESULT', reader.result);
      this.image = reader.result?.toString();
    };
    reader.readAsDataURL(file);
  }
  order() {
    if (this.accounts && this.balances) {
      const accJson: any[] = JSON.parse(this.accounts);
      const balancesJson: any = JSON.parse(this.balances);
      const accountbalances = accJson.map((x) => {
        return {
          acctNum: x.acctNum,
          user: x.user,
          balance: balancesJson[x.acctNum],
        };
      });
      const outJson = accountbalances
        .sort((x, y) => x.balance - y.balance)
        .map((x) => {
          return { acctNum: x.acctNum, user: x.user };
        });
      this.output = JSON.stringify(outJson);
    }
  }
}
