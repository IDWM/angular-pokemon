import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from './services/flowbite.service';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './interfaces/pokemon';
import { TitleCasePipe } from '@angular/common';
import { PokemonDetail } from './interfaces/pokemon-detail';
import { PokemonData } from './interfaces/pokemon-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemonDetails: PokemonDetail[] = [];

  constructor(
    private flowbiteService: FlowbiteService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {});

    this.getPokemons();
  }

  getPokemons(): void {
    const observer = {
      next: (pokemonData: PokemonData) => {
        this.pokemons = pokemonData.results;

        for (const pokemon of this.pokemons) {
          const parts = pokemon.url.split('/');
          const idString = parts[parts.length - 2];
          const id = parseInt(idString);

          this.pokemonService.getPokemon(id).subscribe({
            next: (pokemonDetailData) => {
              this.pokemonDetails.push(pokemonDetailData);
            },
            error: (error) => {
              console.error('Error fetching pokemon details:', error);
            },
          });
        }
      },
      error: (error: any) => {
        console.error('Error fetching pokemons:', error);
      },
    };

    this.pokemonService.getPokemons().subscribe(observer);
  }
}
