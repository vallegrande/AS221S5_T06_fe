import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from '../item.service';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private itemService: ItemService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '250px',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.createItem(result).subscribe(() => {
          this.fetchItems();
        });
      }
    });
  }

  editItem(item: any): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '250px',
      data: {name: item.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.updateItem(item.id, result).subscribe(() => {
          this.fetchItems();
        });
      }
    });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.fetchItems();
    });
  }
}
