import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataGridComponent } from "../../Shared/data-grid/data-grid.component";
import { Contact } from '../../models/contact.model';
import { tap } from 'rxjs/operators';
import { TableAction } from '../../models/table-action.model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [DataGridComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent {
  messages: Contact[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService, private apollo: Apollo) { }

  ngOnInit(): void {
    this.loading = true;

    this.apiService.getMessages().pipe(
      tap((messages) => {
        this.messages = messages;
        this.loading = false;
      })
    ).subscribe();
  }

  getHeaders(): string[] {
    return ['Type', 'Body', 'Status', 'Created_At'];
  }
}
