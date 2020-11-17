import { Component, Input } from '@angular/core';
import { NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent  {



 @Input() title: string;
  constructor(protected ref: NbDialogRef<EditModalComponent>) {}

 dismiss() {
    this.ref.close();
  }

  doCreate()
  {

  }

}
