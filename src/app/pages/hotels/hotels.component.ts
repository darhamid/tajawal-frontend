import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { ConfirmationDialogService } from '../../services/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { Hotel } from '../../models/hotel.model';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
    hotels: Hotel[];
    cols: any[];
    selectedHotel: Hotel;
    loading: Boolean;
    totalRecords;

    constructor(
      private hotelService: HotelService,
      private router: Router,
      private confirmationDialogService: ConfirmationDialogService,
      private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'city', header: 'City' },
            { field: 'availableFrom', header: 'Availabile From' },
            { field: 'availableTo', header: 'Availabile To' }
        ];
        this.loading = true;
        this.hotelService.getHotels().subscribe((hotels: Hotel[]) => {
          this.hotels = hotels;
          this.totalRecords =  hotels.length;
          this.loading = false;
        });

    }

    lazyLoadHotels(event: LazyLoadEvent) {
      this.loading = true;
      const query = this.buildQueryFromEvent(event);
      this.hotelService.getHotels(query).subscribe((hotels: Hotel[]) => {
        this.hotels = hotels;
        this.totalRecords =  hotels.length;
        this.loading = false;
      });
    }

    buildQueryFromEvent(event) {
      let { first: index, rows : size, sortField: sortBy ='name', sortOrder : orderBy, filters } = event;
      orderBy = orderBy === 1 ? 'asc' : 'desc';
      const name = filters.name && filters.name.value ? filters.name.value: '' ;
      const price = filters.price && filters.price.value ? filters.price.value : '';
      const city = filters.city && filters.city.value ? filters.city.value : '';
      const availableFrom = filters.availableFrom && filters.availableFrom.value ? filters.availableFrom.value : '';
      const availableTo = filters.availableTo && filters.availableTo.value ? filters.availableTo.value : '';
      const query = { index, size, sortBy, orderBy, name, price, city, availableFrom, availableTo  };
      return query;
    }

    addNewHotel() {
      this.router.navigate([`/hotels/add`]);
    }

    onEdit(hotelId) {
      this.router.navigate([`/hotels/${hotelId}`]);
    }

    onDelete(hotelId) {
      this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to remove this hotel ?')
      .then((confirmed) => {
        if( confirmed ) {
          this.hotelService.delete(hotelId).subscribe(
            deletedHotel => {
              this.toastr.success('Hotel deleted successfully');
              this.hotels = this.hotels.filter((value: any, key )=>{
                 return value._id !== hotelId;
              });
              this.router.navigate(['/'])
            },
            error => this.toastr.error('Failed to delete hotel')
          );
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
}


/*, AfterViewInit {

  hotelsCount: number;
  cols: any[];

  dataSource: HotelsDataSource;

  displayedColumns = ['name', 'price', 'city','Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(
    private router: Router,
    private hotelService: HotelService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
    this.dataSource = new HotelsDataSource(this.hotelService);
    this.dataSource.loadHotels('', 'asc', 0, 30);
    this.dataSource.hotelsCount.subscribe((count) => {
      this.hotelsCount = count;
    });
  }

  ngAfterViewInit() {

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          tap(() => {
            this.paginator.pageIndex = 0;
            this.loadHotelsPage();
          })
        )
        .subscribe();

      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          tap(() => this.loadHotelsPage())
        )
        .subscribe();
    }

    loadHotelsPage() {
      this.dataSource.loadHotels(
        this.input.nativeElement.value,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
    }

    onEdit(hotelId) {
      this.router.navigate([`/hotels/${hotelId}`]);
    }

    onDelete(hotelId) {
      this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to remove this hotel ?')
      .then((confirmed) => {
        if( confirmed ) {
          this.hotelService.delete(hotelId).subscribe(
            deletedHotel => {
              this.toastr.success('Hotel deleted successfully');
              // this.dataSource = this.dataSource.filter((value, key )=>{
              //   return value.id !== hotelId;
              // });
              this.router.navigate(['/'])
            },
            error => this.toastr.error('Failed to delete hotel')
          );
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
} */

