import { Component, inject, OnInit } from '@angular/core'
import { Country } from '@countries/interfaces/country'
import { CountriesService } from '@countries/services/countries.service'
import { catchError } from 'rxjs'

@Component({
	selector: 'app-by-country-page',
	templateUrl: './by-country-page.component.html',
	styles: []
})
export class ByCountryPageComponent implements OnInit {
	countries: Country[] = []
	initialValue: string = ''

	private countriesService = inject(CountriesService)

	ngOnInit(): void {
		this.countries = this.countriesService.cacheStore.byCountry.countries
		this.initialValue = this.countriesService.cacheStore.byCountry.term
	}

	searchByCountry(term: string) {
		this.countriesService.searchCountry(term).pipe(
		catchError((_) => {
			return this.countries = []
		})
		).subscribe((countries) => {
			this.countries = countries
		})
	}

}
