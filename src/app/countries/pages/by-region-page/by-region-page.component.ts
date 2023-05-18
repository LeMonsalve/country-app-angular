import { Component, inject, OnInit } from '@angular/core'
import { Country } from '@countries/interfaces/country'
import { CountriesService } from '@countries/services/countries.service'
import { catchError } from 'rxjs'
import { Region } from '@countries/interfaces/region.type'


@Component({
	selector: 'app-by-region-page',
	templateUrl: './by-region-page.component.html',
	styles: []
})
export class ByRegionPageComponent implements OnInit {
	countries: Country[] = []
	regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
	selectedRegion?: Region

	private countriesService = inject(CountriesService)

	ngOnInit() {
		this.selectedRegion = this.countriesService.cacheStore.byRegion?.region
		this.countries = this.countriesService.cacheStore.byRegion.countries
	}

	searchByRegion(term: Region) {
		this.selectedRegion = term

		this.countriesService.searchRegion(term).pipe(
		catchError((_) => {
			return this.countries = []
		})
		).subscribe((countries) => {
			this.countries = countries
		})
	}
}
