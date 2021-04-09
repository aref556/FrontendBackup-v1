import { FormGroup } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

export interface IProfileComponent {
    // positionItems: any[];
    form: FormGroup;
    modalRef: BsModalRef;

    onSubmit(): void;
    onConvertImage(inputFile: HTMLInputElement): void;
    openModal(template: TemplateRef<any>);
}

export interface IProfile {
    username: string;
    firstname: string;
    lastname: string;
    telphone: string;
    email: string;
    facebook: string;
    line: string;
    image: string;
}