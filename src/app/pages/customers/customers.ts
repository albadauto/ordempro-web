import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customers/customer-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [RouterLink, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  customers: any[] = [];
  isLoading = false;
  searchTerm: string = '';
  filteredUsersList: any[] = [];
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
        this.filteredUsersList = [...this.customers];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.isLoading = false;
  }

  deleteCustomer(id: number) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: (data) => {
          this.customers = this.customers.filter((c) => c.id !== id);
          this.cdr.detectChanges();
        },
      });
    }
  }

  editCustomer(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }

  filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsersList = this.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) || customer.email.toLowerCase().includes(term),
    );
  }
}
