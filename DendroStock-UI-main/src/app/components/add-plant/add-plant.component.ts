import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/_services/plant.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  plant: Plant = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private plantService: PlantService) { }

  ngOnInit(): void {
  }

  savePlant(): void {
    const data = {
      title: this.plant.title,
      description: this.plant.description
    };

    this.plantService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newPlant(): void {
    this.submitted = false;
    this.plant = {
      title: '',
      description: '',
      published: false
    };
  }


}
