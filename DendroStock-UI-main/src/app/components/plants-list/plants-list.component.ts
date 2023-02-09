import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/_services/plant.service';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css']
})
export class PlantsListComponent implements OnInit {

  plants?: Plant[];
  currentPlant: Plant = {};
  currentIndex = -1;
  title = '';
  constructor(private plantService: PlantService) { }

  ngOnInit(): void {
    this.retrievePlants();
  }

  retrievePlants(): void {
    this.plantService.getAll()
      .subscribe({
        next: (data) => {
          this.plants = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrievePlants();
    this.currentPlant = {};
    this.currentIndex = -1;
  }

  setActivePlant(plant: Plant, index: number): void {
    this.currentPlant = plant;
    this.currentIndex = index;
  }

  removeAllPlants(): void {
    this.plantService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentPlant = {};
    this.currentIndex = -1;

    this.plantService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.plants = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


}
