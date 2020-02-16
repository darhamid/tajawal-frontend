import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HotelService } from './hotel.service';
import { Hotel } from './../models/hotel.model';


export class HotelsDataSource implements DataSource<Hotel> {

    public hotelsSubject = new BehaviorSubject<Hotel[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public hotelsCount = new BehaviorSubject<number>(0);

    constructor(private hotelService: HotelService) {

    }

    loadHotels(
        filter: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {

        this.loadingSubject.next(true);

        const filters = {
            filter,
            sortDirection,
            pageIndex,
            pageSize
        };

        const filterObj = { filters: JSON.stringify(filters) };

        this.hotelService.getHotels(filterObj)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((data: any) => {
                console.log('--------------->>>', JSON.stringify(data));
                const hotelsCount = data && data.length ? data.length : 0;
                this.hotelsCount.next(hotelsCount);
                this.hotelsSubject.next(data);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<Hotel[]> {
        console.log('Connecting data source');
        return this.hotelsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.hotelsSubject.complete();
        this.loadingSubject.complete();
        this.hotelsCount.complete();
    }

}
