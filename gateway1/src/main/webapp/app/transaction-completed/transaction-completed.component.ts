import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardService } from '../entities/card/card.service';
import { Card } from '../entities/card/card.model';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { BankService } from '../entities/bank';
import { TicketModel } from '../models/ticket-model';
import { DataService } from '../data.service';
import { FlightsService } from '../entities/flights/flights.service';
import { Flights } from '../entities/flights';
import { UserinfoService } from '../entities/userinfo/userinfo.service';
import { Userinfo } from '../entities/userinfo/userinfo.model';
import { Bank } from '../entities/bank/bank.model';
import { resolveSoa } from 'dns';
import { OrderHistory, OrderHistoryService } from '../entities/order-history';

@Component({
  selector: 'jhi-transaction-completed',
  templateUrl: './transaction-completed.component.html',
  styleUrls: ['./transaction-completed.component.css']
})

export class TransactionPageComponent implements OnInit {

  passengerIDInfos: any = {
    firstName: '',
    lastName: '',
    sex: 'Male',
    date: '',
    phoneNo: '',
    email: '',
    specialNeeds: Array<number>(),
    card: {
      id: '1',
      number: '',
      expirationDate: '',
      expirationYear: '',
      expirationMonth: '',
      name: '',
      cvv: '',
      cardType: 'Debit card'
    }
  };

  private ticket= new TicketModel();
  private flight: Flights;
  private user: Userinfo;
  showInfoForm = false;
  ticketPrice = 100;

  optionalNeeds: any = [
    { name: 'Blind', value: 10.07 },
    { name: 'Deaf', value: 20.14 },
    { name: 'Congnitive disability', value: 25.17 },
    { name: 'Other disability', value: 0 },
    { name: 'Service animal', value: 12.58 }
  ];

  totalPrice: number = this.ticketPrice;

  getText: any = {
    'title': 'Transaction successful!',
    // tslint:disable-next-line:max-line-length
    'subTitle': 'To​​ comply with the TSA Secure Flight program, the traveler information listed here must exactly match the information on the government - issued photo ID that the traveler presents at the airport.',
    'form': [
      { 'title': 'Passengers' },
      {
        'title': 'Passenger contact information',
        // tslint:disable-next-line:max-line-length
        'subTitle': 'Please let us know the best way to reach you during travel, for important flight status updates or notifications. Our team will use this information to contact you with updates about your travel, if necessary.'
      },
      {
        'title': 'Special passenger needs (Optional)',
        'optionsCheckbox': [
          'Blind',
          'Deaf',
          'Congnitive disability',
          'Other disability requiring assistance',
          'Service animal'
        ]
      },
      {
        'title': 'Payment',
        'optionsRadio': [
          'Credit card',
          'Debit card'
        ]
      }
    ],
    'formID': {
      'firstName': 'First name',
      'lastName': 'Last name',
      'middleName': 'Middle name',
      'sex': [
        'Sex',
        'Male',
        'Female',
      ],
      'date': 'Date of birth'
    },
    'formCard': {
      'name': 'Name on card',
      'number': 'Credit card number',
      'exp': 'Expiration',
      'cvv': 'CVV'
    },
    'information': {
      'number': '41520466061284601',
      'name': 'Popescu Ion',
      'exp': 'February 23',
      'cvv': '020',
      'totalPrice': '400 USD',
      'departure' : 'London',
      'arrival' : 'Bucharest',
      'departure_time' : '23:00',
      'arrival_time' : '24:00',
      'seats' : '23',
      'special_needs' : 'no special needs',
      'adress' : '721  Coburn Hollow Road',
      'email' : 'popescu.georgel@gmail.com',
      'phoneNumber' : '0765555555'

    },
    'checkCart': {
      'ticket': 'Ticket (' + 1 + ')',
      'specialNeeds': Array<number>(),
      'total': 'Total',
      'totalSmall': 'Including taxes and fees',
      'departed': 'Departed'
    }
  };

  constructor(private cardService: CardService,
    private jhiAlertService: JhiAlertService,
    private bankService: BankService,
    private dataService: DataService,
    private flightsService: FlightsService,
    private userInfoService: UserinfoService,
    private orderHistoryService: OrderHistoryService
  ) { }

  // Recomandat de facut initializarile aici
  ngOnInit() {
    // Raman de luat locurile si tipul avionului din ticket
    this.dataService.ticketInfo.subscribe((ticket: TicketModel) => {
      this.ticket = ticket;
    });
    // De adaugat metoda de rollback (saga) in caz de eroare
    this.flightsService.find(this.ticket.ticket_flightID).subscribe((flight: HttpResponse<Flights>) => {
      this.flight = flight.body;
    });
    /*this.userInfoService.find(this.ticket.ticket_userID).subscribe((user: HttpResponse) =>{
      this.user = user.body;
    });*/
  }

  submit() {
    this.parseExpirationDate();
    const amount = 100; // virtual amount
    this.bankService.getBankInfo(
      this.passengerIDInfos.card.number,
      this.passengerIDInfos.card.expirationYear,
      this.passengerIDInfos.card.expirationMonth,
      this.passengerIDInfos.card.name,
      this.passengerIDInfos.card.cvv
    ).subscribe(
      (res: HttpResponse<Bank>) => {
        console.log('Funtioneaza! ' + res.body.id );
      },
      (res: HttpErrorResponse) => {
        if ( res.status === 404 ) {
          console.log('Card not found');
        } else {
          console.log('Other Error!');
        }
        this.jhiAlertService.error(res.message, null, null);
      }
    );

    // this.cardService.update(cardInfo).subscribe(
    //   (res: HttpResponse<Card>) => {
    //     console.log("Functioneaza! " + res.body.id);
    //   },
    //   (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null)
    // );
  }

  updateBank( bank: Bank ): boolean {
    if ( bank.amount >= this.totalPrice ) {
      bank.amount -= this.totalPrice;
      this.bankService.update(bank).subscribe(
        (res: HttpResponse<Bank>) => {
          console.log('Updated succesfully! ' + res.body.id + res.body.amount);
          const cardInfo: Card = new Card(
            undefined,
            this.passengerIDInfos.card.number,
            this.passengerIDInfos.card.expirationMonth,
            this.passengerIDInfos.card.expirationYear,
            this.passengerIDInfos.card.name,
            this.passengerIDInfos.card.cvv,
            this.passengerIDInfos.card.cardType
          );
        },
        (res: HttpErrorResponse) => {
          console.log('Bank Error!');
          this.jhiAlertService.error(res.message, null, null);
          return false;
        }
      );
    } else {
      console.log('Fonduri insuficinte! ');
      return false;
    }
    return false;
  }

  updateCard(card: Card): boolean {
    this.cardService.update(card).subscribe(
      (res: HttpResponse<Card>) => {
        console.log('Card updated succesfully! ' + res.body.id );
        return true;
      },
      (res: HttpErrorResponse) => {
          console.log('Card Error!');
          this.jhiAlertService.error(res.message, null, null);
          return false;
      }
    );
    return false;
  }

  updateOrderHistory(order: OrderHistory): boolean {
    this.orderHistoryService.update(order).subscribe(
      (res: HttpResponse<OrderHistory>) => {
        console.log('Order updated succesfully! ' + res.body.id );
        return true;
      },
      (res: HttpErrorResponse) => {
        console.log('OrderHistory Error!');
        this.jhiAlertService.error(res.message, null, null);
        return false;
      }
    );
    return false;
  }

  toggleInfoForm(selectedValue): void {
    this.showInfoForm = selectedValue;
  }

  selectChangedHandler(event: any): void {
    this.passengerIDInfos.sex = event.target.value;
  }

  onSelectionChangeCard(event: any): void {
    this.passengerIDInfos.card.cardType = event.target.value;
    this.passengerIDInfos.card.id = event.target.id;
  }

  onSelectionChangeNeeds(event: any): void {
    const index = this.passengerIDInfos.specialNeeds.indexOf(event.target.id, 0);
    const indexOptions = this.getText.checkCart.specialNeeds.indexOf(event.target.id, 0);
    if (index > -1) {
      this.passengerIDInfos.specialNeeds.splice(index, 1);
      this.getText.checkCart.specialNeeds.splice(index, 1);
      this.totalPrice -= this.optionalNeeds[event.target.id].value;
    } else {
      this.passengerIDInfos.specialNeeds.push(event.target.id);
      this.getText.checkCart.specialNeeds.push(this.optionalNeeds[event.target.id]);
      this.totalPrice += this.optionalNeeds[event.target.id].value;
    }
  }

  checkInvalidfields(): void {
    const forms = document.getElementsByClassName('needs-validation');
    const validation = Array.prototype.filter.call(forms, function name(form: any) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  parseExpirationDate(): void {
    this.passengerIDInfos.card.expirationYear = this.passengerIDInfos.card.expirationDate.substring(0, 4);
    this.passengerIDInfos.card.expirationMonth = this.passengerIDInfos.card.expirationDate.substring(5, 8);
  }
}
