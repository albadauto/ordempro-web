import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customers/customer-service';

@Component({
  selector: 'app-customers',
  imports: [RouterLink],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  customers: any[] = [];
  isLoading = false;
  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.isLoading = false;
  }

  deleteCustomer(id: number) {
    if(confirm("Tem certeza que deseja excluir este cliente?")){
      this.customerService.deleteCustomer(id).subscribe({
        next: (data) => {
          this.customers = this.customers.filter((c) => c.id !== id);
          this.cdr.detectChanges();
        }
      })
    }
  }

  editCustomer(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }
}
