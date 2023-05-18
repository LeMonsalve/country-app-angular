import { Component, Input } from '@angular/core'
import { Country } from '@countries/interfaces/country'

@Component({
	selector: 'country-table',
	templateUrl: './country-table.component.html',
	styles: []
})
export class CountryTableComponent {
	@Input()
	countries!: Country[]
}
