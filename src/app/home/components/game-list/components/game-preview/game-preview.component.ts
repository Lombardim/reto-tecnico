import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../shared/services/user.service";
import {UserType} from "../../../../../shared/types/user.interface";
import {RentService} from "../../../../../shared/services/rent.service";
import {GameService} from "../../../../../shared/services/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GameInterface} from "../../../../../shared/types/game.interface";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../../../shared/components/dialog/dialog.component";
import {lastValueFrom} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.scss']
})
export class GamePreviewComponent implements OnInit {
  private _gameId: number = 0;
  public loading: boolean = true;
  public gameName: string = 'Nombre del juego';
  public year: string = 'Año';
  public gameDirector: string = 'Director';
  public gameMainCharacters: string = 'Protagonistas';
  public gameProducer: string = 'Productor';
  public gamePlatform: string = 'Plataforma';
  public gamePrice: string = 'XX.XXX';
  public gameImage: string = '';
  public buttonTitle: string = 'ALQUILAR';

  constructor(
    private _userService: UserService,
    private _gameService: GameService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private _alertService: ToastrService,
    private _rentService: RentService
  ) {
  }

  ngOnInit() {
    this.buttonTitle = this._userService.getLogged()?.userType === UserType.admin ? 'CAMBIAR PRECIO' : 'ALQUILAR';
    this.retrieveGameData();
  }

  private async retrieveGameData() {
    const gameId = this._activatedRoute.snapshot.paramMap.get('id');
    if(gameId) {
      const game: GameInterface | undefined = await this._gameService.getGameById(parseInt(gameId));
      if(game) {
        this._gameId = parseInt(gameId);
        this.gameImage = game.image;
        this.gameName = game.name;
        this.year = game.year.toString();
        this.gameDirector = game.director;
        this.gameMainCharacters = game.protagonist;
        this.gameProducer = game.producer;
        this.gamePlatform = game.platform;
        this.gamePrice = game.price.toString();
      }
      this.loading = false;
    }else{
      await this._router.navigateByUrl('/home/games-list');
    }
  }

  public async actionButton() {
    if(this.buttonTitle === 'ALQUILAR') {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '540px',
        height: '375px',
        data: {
          title: 'ALQUILAR JUEGO',
          placeholder: 'Número de días',
          description: 'Escriba el número de días que desea alquilar el juego: ',
          startValue: 1,
          dialogType: 'one-input'
        }
      });
      let dialogResult: number | undefined = await lastValueFrom(dialogRef.afterClosed());
      if(dialogResult) {
        try {
          await this._rentService.rentAGame(this._gameId, this._userService.getLogged()!.id, dialogResult);
        }catch (e) {
          this._alertService.error('' + e, 'RENTAR UN JUEGO');
        }
      }else{
        this._alertService.info('Se canceló la acción', 'ALQUILAR JUEGO');
      }
    }else{
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '540px',
        height: '375px',
        data: {
          title: 'CAMBIAR ALQUILER',
          placeholder: 'Precio del alquiler',
          description: 'Escriba el valor de alquiler nuevo: ',
          startValue: parseInt(this.gamePrice),
          dialogType: 'one-input'
        }
      });
      let dialogResult: number | undefined = await lastValueFrom(dialogRef.afterClosed());
      if(dialogResult) {
        try {
          await this._gameService.updateGamePriceById(this._gameId, dialogResult);
          this.gamePrice = dialogResult.toString();
        }catch (e) {
          this._alertService.error('' + e, 'CAMBIAR PRECIO ALQUILER');
        }
      }else{
        this._alertService.info('Se canceló la acción', 'CAMBIAR PRECIO ALQUILER');
      }
    }
  }
}
