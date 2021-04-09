import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../shareds/services/account.service';
import { AuthenService } from '../../../services/authen.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SharedsService } from '../../../shareds/services/shareds.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
    constructor(
        private buider: FormBuilder,
        private account: AccountService,
        private authen: AuthenService,
        private alert: AlertService,
        private modalService: BsModalService,
        private shareds: SharedsService
    ) {

        this.initialLoadUpdateFormData();
        // เพิ่ม position
        // this.positionItems = this.shareds.positionItems;
        this.initialCreateFormData();
    }

    form: FormGroup;
    modalRef: BsModalRef;
    // positionItems: any[] = [];

    // บันทึกข้อมูล
    onSubmit() {
        // console.log(this.form.value);
        if (this.form.invalid) return this.alert.someting_wrong();
        this.account
            .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
            .then(() => this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info'))
            .catch(err => this.alert.notify(err.Message));
    }

    // แปลงไฟล์รูปเป็น Base64
    onConvertImage(input: HTMLInputElement) {
        const imageControl = this.form.controls['image'];
        this.shareds
            .onConvertImage(input)
            .then(base64 => imageControl.setValue(base64))
            .catch(err => {
                input.value = null;
                imageControl.setValue(null);
                this.alert.notify(err.Message);
            });
    }

    // เปิด Modal dialog
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    // สร้างฟอร์ม 
    private initialCreateFormData() {
        this.form = this.buider.group({
            username: [this.account.UserLogin.username, Validators.required],
            firstname: [this.account.UserLogin.firstname, Validators.required],
            lastname: [this.account.UserLogin.lastname, Validators.required],
            telphone: [this.account.UserLogin.telphone,Validators.required],
            email: [this.account.UserLogin.email, Validators.required],
            facebook: [this.account.UserLogin.facebook, Validators.required],
            line: [this.account.UserLogin.line, Validators.required],
            image: [this.account.UserLogin.image]
        });
        // disabled อีเมล์
        this.form.get('username').disable();
        // this.form.get('lastname');
        // this.form.get('telphone');
        // this.form.get('email');
        // this.form.get('facebook');
        // this.form.get('line');
        // this.form.get('image');
    }

    // โหลดข้อมูลใหม่พร้อมกับ Update form data
    private initialLoadUpdateFormData() {
        this.account
            .getUserLogin(this.authen.getAuthenticated())
            .then(user => {
                // console.log(user.image);
                this.form.controls['username'].setValue(user.username);
                this.form.controls['firstname'].setValue(user.firstname);
                this.form.controls['lastname'].setValue(user.lastname);
                this.form.controls['email'].setValue(user.email);
                this.form.controls['telphone'].setValue(user.telphone);
                this.form.controls['facebook'].setValue(user.facebook);
                this.form.controls['line'].setValue(user.line);
                this.form.controls['image'].setValue(user.image);
            })
            .catch(err => this.alert.notify(err.Message));
    }
}
