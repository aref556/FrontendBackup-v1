import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AlertService } from './alert.service';
@Injectable()
export class ValidatorsService {
    constructor(
        private alert: AlertService,

    ) { }

    // สร้าง validate เอง โดยเช็ค รหัสผ่านและยืนยันรหัสผ่านให้เหมือนกัน
    comparePassword(passwordField: string) {
        return function (confirm_password: AbstractControl) {
            if (!confirm_password.parent) return;
            const password = confirm_password.parent.get(passwordField);
            const passwordSubscripe = password.valueChanges.subscribe(() => {
                confirm_password.updateValueAndValidity();
                passwordSubscripe.unsubscribe();
            });
            if (confirm_password.value === password.value)
                return;
            return { compare: true };
        }
    }

    // ตรวจสอบ password pattern เป็น A-z 0-9, 6-15 ตัว
    isPassword(password: AbstractControl) {
        if (password.value == '') return;
        if (/^[A-z0-9]$/.test(password.value)) return;
        return { password: true };
    }

    // isGoodPassword(password: AbstractControl) {
    //     if (password.value == '') {
    //         this.alert.passwordIsEmpty();
    //         return;
    //     }
    //     if (/^(?=.*[a-z])$/.test(password.value)) {
    //         if (/^(? =. * [A-Z])$/.test(password.value)) {
    //             if (/^(? =. * [0-9])$/.test(password.value)) {
    //                 if (/^(? =. * [! @ # $% ^ & *]))$/.test(password.value)) {
    //                     if (/^(? =. {8,}))$/.test(password.value)) {
    //                         return { password: true };
    //                     }
    //                     else {
    //                         this.alert.notify('รหัสผ่านต้องมีอักขระ 8 ตัวขึ้นไป');
    //                         return;
    //                     }

    //                 }
    //                 else {
    //                     this.alert.notify('รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว');
    //                     return;
    //                 }
    //             }
    //             else {
    //                 this.alert.notify('รหัสผ่านต้องมีอักขระตัวเลขอย่างน้อย 1 ตัว');
    //                 return;
    //             }
    //         }
    //         else {
    //             this.alert.notify('รหัสผ่านต้องมีอักขระตามตัวอักษรตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว');
    //             return;
    //         }
    //     }
    //     else {
    //         this.alert.notify('รหัสผ่านต้องมีอักขระตามตัวอักษรตัวพิมพ์เล็กอย่างน้อย 1 ตัว');
    //         return;
    //     }
    // }

}