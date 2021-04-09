import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { IForgot, IForgotComponent } from './forgot.interface';
import { AppURL } from 'src/app/app.url'

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements IForgotComponent {

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private router: Router,

  ) { 
    this.initialCreateFormData();
  }
  Url = AppURL;
  form: FormGroup;

  onSubmit() {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    // ส่งข้อมูลหา Server
    this.account
      .onForgot(this.form.value)
      .then(res => {
        this.alert.notify('เปลี่ยนรหัสผ่านสำเร็จ', 'info');
        this.router.navigate(['/', AppURL.Login]);
      })
      .catch(err => this.alert.notify(err.Message));
  }
  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
        username: ['', [Validators.required]],
        macaddress: ['', [Validators.required]],
        newpassword: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],

    });
}


}
