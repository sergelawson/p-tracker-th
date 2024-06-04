import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapsComponent } from '../maps/maps.component';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MapsComponent],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css',
})
export class DriverComponent {
  deliveryId = new FormControl('');
  locationTo: LocationResponse = {
    name: 'Lome',
    longitude: 12,
    latitude: 1.2,
  };
  locationFrom: LocationResponse = {
    name: 'Aneho',
    longitude: 12,
    latitude: 2.2,
  };
}

type LocationResponse = {
  name: string;
  latitude: number;
  longitude: number;
};
