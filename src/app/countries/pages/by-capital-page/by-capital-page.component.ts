import { Component, inject, OnInit } from '@angular/core'
import { CountriesService } from '@countries/services/countries.service'
import { Country } from '@countries/interfaces/country'

@Component({
	selector: 'app-by-capital-page',
	templateUrl: './by-capital-page.component.html',
	styles: []
})
export class ByCapitalPageComponent implements OnInit {
	countries: Country[] = []
	initialValue: string = ''
	isLoading: boolean = false

	private countriesService = inject(CountriesService)

	ngOnInit(): void {
		this.countries = this.countriesService.cacheStore.byCapital.countries
		this.initialValue = this.countriesService.cacheStore.byCapital.term
	}

	searchByCapital(term: string) {
		if ( !term ) return

		this.isLoading = true

		this.countriesService.searchCapital(term).subscribe((countries) => {
			this.countries = countries
			this.isLoading = false
		})
	}
}
