import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { debounceTime, Subject, Subscription } from 'rxjs'

@Component({
	selector: 'shared-search-box',
	templateUrl: './search-box.component.html',
	styles: []
})
export class SearchBoxComponent implements OnInit, OnDestroy {
	@Input()
	placeholder!: string

	@Input()
	initialValue!: string

	@Output()
	onValue: EventEmitter<string> = new EventEmitter()

	@Output()
	onDebounce: EventEmitter<string> = new EventEmitter()

	private debouncer: Subject<string> = new Subject<string>()
	private debouncerSubscription?: Subscription

	ngOnInit(): void {
		this.debouncerSubscription = this.debouncer
																		 .pipe(
																		 debounceTime(500)
																		 )
																		 .subscribe((value) => {
																			 this.onDebounce.emit(value)
																		 })
	}

	ngOnDestroy(): void {
		this.debouncerSubscription?.unsubscribe()
	}

	onEnter(value: string) {
		this.onValue.emit(value)
	}

	onKeyPress(searchTerm: string) {
		this.debouncer.next(searchTerm)
	}
}
