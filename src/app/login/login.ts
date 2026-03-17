import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ RouterModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private route: ActivatedRoute){
  }
  accountIsCreated: boolean = false;
  accountCreatedError: boolean = false;
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if(params['created']){
        this.accountIsCreated = true;
      }
    })
  }

}
