import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonData } from '../interfaces/pokemon-data';
import { PokemonDetail } from '../interfaces/pokemon-detail';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<PokemonData> {
    return this.http.get<PokemonData>(`${this.apiUrl}/pokemon`);
  }

  getPokemon(id: number): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.apiUrl}/pokemon/${id}`);
  }
}
