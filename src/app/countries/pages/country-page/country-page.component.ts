import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CountriesService } from '@countries/services/countries.service'
import { switchMap } from 'rxjs'
import { Country } from '@countries/interfaces/country'

@Component({
	selector: 'app-country-page',
	templateUrl: './country-page.component.html',
	styles: []
})
export class CountryPageComponent implements OnInit {

	country?: Country
	private countriesService = inject(CountriesService)
	private activatedRoute = inject(ActivatedRoute)
	private router = inject(Router)

	ngOnInit(): void {
		this.activatedRoute.params
				.pipe(
				switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode(id)),
				)
				.subscribe((country) => {
					if ( !country ) return this.router.navigateByUrl('')

					this.country = country as Country
					return
				})
	}

}
