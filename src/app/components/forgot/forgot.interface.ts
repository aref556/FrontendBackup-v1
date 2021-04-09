import { FormGroup } from "@angular/forms";


export interface IForgotComponent { 
    Url: any;
    form: FormGroup;

    onSubmit(): void;
}

export interface IForgot {
    username: string;
    macaddress: string;
    newpassword: string;
    cpassword: string;
}