import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  searchForm = this.formBuilder.group({
    searchInput: ""
  });

  ngOnInit(): void {
  }

  searchData() {
    console.log(this.searchForm.value);

  }

  resetForm() {
    this.searchForm.reset();
  }

}
