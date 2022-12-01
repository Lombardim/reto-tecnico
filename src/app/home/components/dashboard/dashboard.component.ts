import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {UserInterface, UserType} from "../../../shared/types/user.interface";
import {GameService} from "../../../shared/services/game.service";
import {RentService} from "../../../shared/services/rent.service";
import {ColumnsInterface, TableInterface} from "../../../shared/types/table.interface";
import {GameInterface} from "../../../shared/types/game.interface";
import {ToastrService} from "ngx-toastr";
import {DialogComponent} from "../../../shared/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Rent} from "../../../shared/types/rent.interface";
import * as moment from "moment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {'class': 'max-size flex-center'}
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = true;
  previewRentedGames: boolean = false;
  public mostFrequentClient: string = 'Nombre de usuario';
  public mostRentedGame: string = 'Nombre del juego';
  public userDisplayedColumns: ColumnsInterface[] = [
    {key: 'game', value: 'JUEGO ALQUILADO'},
    {key: 'rentedTime', value: 'TIEMPO ALQUILER'},
    {key: 'remainingTime', value: 'TIEMPO RESTANTE'},
    {key: 'totalPayed', value: 'TOTAL PAGADO'},
    {key: 'actions', value: 'ACCIONES'}
  ];
  public adminAgeRangeDisplayedColumns: ColumnsInterface[] = [
    {key: 'firstRange', value: '0-9'},
    {key: 'secondRange', value: '10-19'},
    {key: 'thirdRange', value: '20-29'},
    {key: 'fourthRange', value: '30-39'},
    {key: 'fifthRange', value: '40-49'},
    {key: 'sixthRange', value: '50-59'},
    {key: 'seventhRange', value: '60-69'},
    {key: 'eighthRange', value: '70-79'},
    {key: 'ninthRange', value: '80-89'},
    {key: 'tenthRange', value: '90-99'}
  ];
  public adminRentedGamesDisplayedColumns: ColumnsInterface[] = [
    {key: 'userName', value: 'JUEGO ALQUILADO'},
    {key: 'game', value: 'JUEGO ALQUILADO'},
    {key: 'rentedTime', value: 'TIEMPO ALQUILER'},
    {key: 'remainingTime', value: 'TIEMPO RESTANTE'},
    {key: 'totalPayed', value: 'TOTAL PAGADO'},
    {key: 'actions', value: 'ACCIONES'}
  ];
  adminRentedGamesDisplayableData: TableInterface[] = [];
  adminAgeRangeDisplayableData: TableInterface[] = [];
  userDisplayableData: TableInterface[] = [];
  loading: boolean = true;

  constructor(
    private _userService: UserService,
    private _toastr: ToastrService,
    private _gameService: GameService,
    private dialog: MatDialog,
    private _rentService: RentService
  ) {

  }

  ngOnInit() {
    this.isAdmin = this._userService.getLogged()?.userType === UserType.admin;
    this.retrieveDashboardData();
  }

  private async retrieveDashboardData() {
    if(this.isAdmin) {
      const mostRentedGame = await this._gameService.mostRentedGame();
      this.mostRentedGame = mostRentedGame.length === 0 ? 'No hay información' : (mostRentedGame as unknown as GameInterface).name;
      const mostFrequentClient = await this._gameService.mostFrequentClient();
      const name: string[] = [];
      if(mostFrequentClient.length !== 0) {
        const client: UserInterface = mostFrequentClient as unknown as UserInterface;
        if(client.firstName !== '')
          name.push(client.firstName);
        if(client.secondName && client?.secondName !== '')
          name.push(client.secondName);
        if(client.lastName !== '')
          name.push(client.lastName);
        if(client.secondLastName && client.secondLastName !== '')
          name.push(client.secondLastName);
      }
      this.mostFrequentClient = name.length === 0 ? 'No hay información' : name.join(' ');
      await this.actionButton(false);
    }else{
      const userRentedGames = await this._rentService.getAllRentsById(this._userService.userId);
      this.userDisplayableData = userRentedGames.map((rent) => {
        const names: string[] = [];
        if(rent.rentedBy.firstName !== '')
          names.push(rent.rentedBy.firstName);
        if(rent.rentedBy.secondName && rent.rentedBy?.secondName !== '')
          names.push(rent.rentedBy.secondName);
        if(rent.rentedBy.lastName !== '')
          names.push(rent.rentedBy.lastName);
        if(rent.rentedBy.secondLastName && rent.rentedBy.secondLastName !== '')
          names.push(rent.rentedBy.secondLastName);
        const createdAt: Date = new Date(rent.createdAt);
        const rentedUntil: Date = new Date(rent.rentedUntil);
        const dateNow: Date = new Date();

        // To calculate the time difference of two dates
        let differenceMilliseconds: number = rentedUntil.getTime() - createdAt.getTime();
        let rentedTime: number = differenceMilliseconds / (1000 * 3600 * 24);
        let remainingTime: number = (rentedUntil.getTime() - dateNow.getTime()) / (1000 * 3600 * 24);

        return {
          'id': rent.id.toString(),
          'game': rent.game.name,
          'rentedTime': `${Math.floor(rentedTime)}`,
          'remainingTime': `${remainingTime >= 0 ? Math.ceil(remainingTime) : 0}`,
          'totalPayed': `$ ${rent.totalPayed * Math.floor(rentedTime)},00`
        };
      });
    }
    this.loading = false;
  }

  async checkTodaySoldItems() {
    const rentedGames = await this._rentService.getAllRent();
    const today = new Date();
    const todayRents = rentedGames.filter((rent) => {
      const todayDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
      const rentedAt = new Date(rent.createdAt);
      const rentDate = `${rentedAt.getDate()}/${rentedAt.getMonth()}/${rentedAt.getFullYear()}`;
      return rentDate === todayDate;
    });
    let totalIncome: number = 0;
    todayRents.forEach((rent) => {
      totalIncome += rent.totalPayed;
    });
    this.dialog.open(DialogComponent, {
      width: '500px',
      height: '350px',
      data: {
        title: 'VENTAS HOY',
        placeholder: '',
        description: `Productos vendidos hoy: ${todayRents.length}
          \nTotal ganado: $ ${totalIncome},00`,
        startValue: -1,
        dialogType: 'info'
      }
    });
  }

  async actionButton(update: boolean = true) {
    this.loading = true;
    if(update) this.previewRentedGames = !this.previewRentedGames;
    this.adminRentedGamesDisplayableData = [];
    this.adminAgeRangeDisplayableData = [];
    if(this.isAdmin) {
      try{
        const firstRange = await this._gameService.mostRentedGameByRange(0, 9);
        const secondRange = await this._gameService.mostRentedGameByRange(10, 19);
        const thirdRange = await this._gameService.mostRentedGameByRange(20, 29);
        const fourthRange = await this._gameService.mostRentedGameByRange(30, 39);
        const fifthRange = await this._gameService.mostRentedGameByRange(40, 49);
        const sixthRange = await this._gameService.mostRentedGameByRange(50, 59);
        const seventhRange = await this._gameService.mostRentedGameByRange(60, 69);
        const eighthRange = await this._gameService.mostRentedGameByRange(70, 79);
        const ninthRange = await this._gameService.mostRentedGameByRange(80, 89);
        const tenthRange = await this._gameService.mostRentedGameByRange(90, 99);

        this.adminAgeRangeDisplayableData = [{
          'firstRange': firstRange.length === 0 ? 'Sin datos' : (firstRange as unknown as GameInterface).name,
          'secondRange': secondRange.length === 0 ? 'Sin datos' : (secondRange as unknown as GameInterface).name,
          'thirdRange': thirdRange.length === 0 ? 'Sin datos' : (thirdRange as unknown as GameInterface).name,
          'fourthRange': fourthRange.length === 0 ? 'Sin datos' : (fourthRange as unknown as GameInterface).name,
          'fifthRange': fifthRange.length === 0 ? 'Sin datos' : (fifthRange as unknown as GameInterface).name,
          'sixthRange': sixthRange.length === 0 ? 'Sin datos' : (sixthRange as unknown as GameInterface).name,
          'seventhRange': seventhRange.length === 0 ? 'Sin datos' : (seventhRange as unknown as GameInterface).name,
          'eighthRange': eighthRange.length === 0 ? 'Sin datos' : (eighthRange as unknown as GameInterface).name,
          'ninthRange': ninthRange.length === 0 ? 'Sin datos' : (ninthRange as unknown as GameInterface).name,
          'tenthRange': tenthRange.length === 0 ? 'Sin datos' : (tenthRange as unknown as GameInterface).name
        }];
      }catch (e) {
        this._toastr.error('' + e, 'TABLA DE RANGO DE EDADES');
      }
      try{
        const rentedGames = await this._rentService.getAllRent();
        this.adminRentedGamesDisplayableData = rentedGames.map((rent) => {
          const names: string[] = [];
          if(rent.rentedBy.firstName !== '')
            names.push(rent.rentedBy.firstName);
          if(rent.rentedBy.secondName && rent.rentedBy?.secondName !== '')
            names.push(rent.rentedBy.secondName);
          if(rent.rentedBy.lastName !== '')
            names.push(rent.rentedBy.lastName);
          if(rent.rentedBy.secondLastName && rent.rentedBy.secondLastName !== '')
            names.push(rent.rentedBy.secondLastName);
          const createdAt: Date = new Date(rent.createdAt);
          const rentedUntil: Date = new Date(rent.rentedUntil);
          const dateNow: Date = new Date();

          // To calculate the time difference of two dates
          let differenceMilliseconds: number = rentedUntil.getTime() - createdAt.getTime();
          let rentedTime: number = differenceMilliseconds / (1000 * 3600 * 24);
          let remainingTime: number = (rentedUntil.getTime() - dateNow.getTime()) / (1000 * 3600 * 24);

          return {
            'id': rent.id.toString(),
            'userName': names.join(' '),
            'game': rent.game.name,
            'rentedTime': `${Math.floor(rentedTime)}`,
            'remainingTime': `${remainingTime >= 0 ? Math.ceil(remainingTime) : 0}`,
            'totalPayed': `$ ${rent.totalPayed},00`,
            'actions': ''
          };
        });
      }catch (e) {
        this._toastr.error('' + e, 'TABLA DE RENTAS ACTUALES');
      }
    }
    this.loading = false;
  }

  async claimGame(gameData: { row: { [k: string]: string }, index: number, enabled: boolean }) {
    if(gameData.enabled) {
      let rentId: number = parseInt(gameData.row['id']) ?? 1;
      if(this.isAdmin) {
        try {
          await this._rentService.claimAGameFromRent(rentId);
        }catch (e) {
          this._toastr.error('Ocurrió un error al reclamar el juego', 'RECLAMAR JUEGO ALQUILADO');
        }
      }else{
        try {
          const rent: Rent = await this._rentService.getRentById(rentId);
          const createdAt: Date = new Date(rent.createdAt);
          const rentedUntil: Date = new Date(rent.rentedUntil);
          let differenceMilliseconds: number = rentedUntil.getTime() - createdAt.getTime();
          let rentedTime: number = Math.floor(differenceMilliseconds / (1000 * 3600 * 24));
          this.dialog.open(DialogComponent, {
            width: '600px',
            height: '400px',
            data: {
              title: 'PRUEBA DE COMPRA',
              placeholder: '',
              description: `
                Juego alquilado: ${rent.game.name}
                \nDía de inicio del alquiler: ${moment(createdAt).format('dd/MM/YYYY - HH:mm:ss')}
                \nDías de alquiler: ${rentedTime} día${rentedTime === 1 ? '' : 's'}
                \nTotal pagado: $ ${rent.totalPayed * Math.floor(rentedTime)},00`,
              startValue: -1,
              dialogType: 'receipt'
            }
          });
        }catch (e) {
          console.error(e);
          this._toastr.error('Ocurrió un error obteniendo la información del alquiler', 'RECIBO ALQUILER');
        }
      }
    }
  }
}
