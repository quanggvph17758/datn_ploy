import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { OrderService } from 'src/app/_service/order-service/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  validForm!: FormGroup;
  orders: any[] = [];
  count1: any;
  count2: any;
  count3: any;
  count4: any;
  count5: any;
  reason: any;

  constructor(private orderSer: OrderService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.validForm = new FormGroup({
      'reason': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(200)]),
    });

    this.getListOrderByStatus();
    this.getCountOrder1();
    this.getCountOrder2();
    this.getCountOrder3();
    this.getCountOrder4();
    this.getCountOrder5();
  }

  getListOrderByStatus() {
    this.orderSer.getOrderByStatusandAccount("CHOXACNHAN")
      .subscribe(data => {
        this.orders = data.data;
        console.log(data.data);
      });
  }

  getCountOrder1() {
    this.orderSer.getCountOrderByStatus(0)
      .subscribe(data => {
        this.count1 = data.data;
        console.log(data);
      });
  }

  getCountOrder2() {
    this.orderSer.getCountOrderByStatus(1)
      .subscribe(data => {
        this.count2 = data.data;
        console.log(data);
      });
  }

  getCountOrder3() {
    this.orderSer.getCountOrderByStatus(2)
      .subscribe(data => {
        this.count3 = data.data;
        console.log(data);
      });
  }

  getCountOrder4() {
    this.orderSer.getCountOrderByStatus(3)
      .subscribe(data => {
        this.count4 = data.data;
        console.log(data);
      });
  }

  getCountOrder5() {
    this.orderSer.getCountOrderByStatus(4)
      .subscribe(data => {
        this.count5 = data.data;
        console.log(data);
      });
  }

  cancelOrder(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'H???y ????n H??ng',
      text: "B???n c?? ch???c ch???n mu???n h???y ????n h??ng kh??ng?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ch???c Ch???n!',
      cancelButtonText: 'Kh??ng',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderSer.canceledOrder(id, this.reason)
          .subscribe(data => {
            this.toast.success({ summary: 'H???y ????n h??ng th??nh c??ng!', duration: 3000 });
            this.ngOnInit();
          });
        swalWithBootstrapButtons.fire('Deleted!','H???y ????n h??ng Th??nh C??ng', 'success')
      }
    })
  }
}
