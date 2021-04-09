import { FormGroup } from '@angular/forms';

export interface IRegisterComponent {
    form: FormGroup;
    Url: any;

    onSubmit();
}


export interface IRegister {
    
    username: string;
    password: string;

    macaddress: string;

}