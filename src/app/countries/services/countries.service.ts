import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map, Observable, of, tap } from 'rxjs'
import { Country } from '@countries/interfaces/country'
import { CacheStore } from '@countries/interfaces/cache-store.interface'
import { Region } from '@countries/interfaces/region.type'

@Injectable({ providedIn: 'root' })
export class CountriesService {
	cacheStore: CacheStore = {
		byCapital: { term: '', countries: [] },
		byCountry: { term: '', countries: [] },
		byRegion: { countries: [] },
	}

	private apiUrl = 'https://restcountries.com/v3.1'

	constructor(private http: HttpClient) {
		this.loadFromLocalStorage()
	}

	searchCountryByAlphaCode(term: string): Observable<Country | null> {
		return this.getCountries('alpha', term).pipe(
		map((countries) => countries.length > 0 ? countries[0] : null)
		)
	}

	searchCapital(term: string): Observable<Country[]> {
		return this.getCountries('capital', term).pipe(
		tap((countries) => {
			this.cacheStore.byCapital = { term, countries }
		}),
		tap((_) => this.saveToLocalStorage())
		)
	}

	searchCountry(term: string): Observable<Country[]> {
		return this.getCountries('name', term).pipe(
		tap((countries) => {
			this.cacheStore.byCountry = { term, countries }
		}),
		tap((_) => this.saveToLocalStorage())
		)
	}

	searchRegion(term: Region): Observable<Country[]> {
		return this.getCountries('region', term).pipe(
		tap((countries) => {
			this.cacheStore.byRegion = { region: term, countries }
		}),
		tap((_) => this.saveToLocalStorage())
		)
	}

	private saveToLocalStorage() {
		localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
	}

	private loadFromLocalStorage() {
		const cacheStore = localStorage.getItem('cacheStore')
		if ( cacheStore ) {
			this.cacheStore = JSON.parse(cacheStore)
		}
	}

	private getCountries(endpoint: string, term: string): Observable<Country[]> {
		const url = `${ this.apiUrl }/${ endpoint }/${ term }`
		return this.http.get<Country[]>(url).pipe(
		catchError(() => of([]))
		)
	}
}