import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-admin-add-update',
  templateUrl: './admin-add-update.component.html',
  styleUrls: ['./admin-add-update.component.scss']
})
export class AdminAddUpdateComponent implements OnInit {

  constructor(protected ref: NbDialogRef<AdminAddUpdateComponent>) { }

  ngOnInit() {
  }
  cancel() {
    this.ref.close();
  }
}
