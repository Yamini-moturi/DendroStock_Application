import { Component, Input, OnInit } from '@angular/core';
import { PlantService } from 'src/app/_services/plant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/app/models/plant.model';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentPlant: Plant = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';

  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPlant(this.route.snapshot.params["id"]);
    }
  }

  getPlant(id: string): void {
    this.plantService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPlant = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentPlant.title,
      description: this.currentPlant.description,
      published: status
    };

    this.message = '';

    this.plantService.update(this.currentPlant.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentPlant.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updatePlant(): void {
    this.message = '';

    this.plantService.update(this.currentPlant.id, this.currentPlant)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Plant was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deletePlant(): void {
    this.plantService.delete(this.currentPlant.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/plants']);
        },
        error: (e) => console.error(e)
      });
  }

}
