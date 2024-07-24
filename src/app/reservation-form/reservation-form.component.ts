import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private reservationServie: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['',Validators.required],
      checkOutDate: ['',Validators.required],
      guestName: ['',Validators.required],
      guestEmail: ['',[Validators.required, Validators.email]],
      roomNumber: ['',Validators.required]

    })
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    if(id){
      let reservation = this.reservationServie.getReservation(id);
      if(reservation){
        this.reservationForm.patchValue(reservation);
      }
    }
  }
  onSubmit():void{
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    let reservation: Reservation = this.reservationForm.value;
    if(id){
      this.reservationServie.updateReservation(id,reservation);
    }
    else{
      this.reservationServie.addReservation(reservation);  
    }
    
    this.router.navigate(['/list']);
  }

}
