import { Component } from '@angular/core';
import {FormControl, FormGroup } from "@angular/forms";
import {GameInterface} from "../../../shared/types/game.interface";
import {GameService} from "../../../shared/services/game.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  host: {'class': 'max-size flex-center'}
})
export class GameListComponent {
  public filterForm: FormGroup = new FormGroup({
    filter: new FormControl(''),
    radioButton: new FormControl('gameTitle')
  });
  public gamesList: GameInterface[] = [];
  public filteredGamesList?: GameInterface[] = undefined;

  constructor(
    private gameService: GameService
  ) {
    this.retrieveGames();
  }

  private async retrieveGames() {
    this.gamesList = await this.gameService.getAllGames();
  }

  filter() {
    const searchValue = this.filterForm.get('filter')?.value ?? '';
    if(searchValue == '') {
      console.error('El campo de búsqueda está vacío');
      return;
    }
    switch (this.filterForm.get('radioButton')?.value) {
      case 'gameNitle':
        this.filteredGamesList = this.gamesList.filter((game) =>
          (game.name.toLowerCase()).includes(`${searchValue}`.toLowerCase())
        );
        break;
      case 'gameDirector':
        this.filteredGamesList = this.gamesList.filter((game) =>
          (game.director.toLowerCase()).includes(`${searchValue}`.toLowerCase())
        );
        break;
      case 'gameProtagonist':
        this.filteredGamesList = this.gamesList.filter((game) =>
          (game.protagonist.toLowerCase()).includes(`${searchValue}`.toLowerCase())
        );
        break;
      case 'gameProducer':
        this.filteredGamesList = this.gamesList.filter((game) =>
          (game.producer.toLowerCase()).includes(`${searchValue}`.toLowerCase())
        );
        break;
      case 'gameYear':
        this.filteredGamesList = this.gamesList.filter((game) =>
          ((game.year).toString().toLowerCase()).includes(`${searchValue}`.toLowerCase())
        );
        break;
    }
    if(this.filteredGamesList?.length === 0) {
      console.error('No se encontraron juegos con los filtros seleccionados');
    }
  }

  clearFilters() {
    this.filterForm.get('filter')?.reset();
    this.filterForm.get('radioButton')?.setValue('gameTitle');
    this.filteredGamesList = undefined;
  }
}
