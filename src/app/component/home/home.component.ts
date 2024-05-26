import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  engines: SelectItem[] = [];
  terminologies: SelectItem[] = [];
  selectedEngine?: string;
  isTranslateImage: boolean = true;
  selectedTerminology?: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initSelectItems();
  }

  initSelectItems(): void {
    this.engines = [
      { label: 'ChatGPT', value: 'chatgpt' },
      { label: 'Google Translate', value: 'gt' },
      { label: 'DeepL', value: 'deepl' },
    ];

    this.terminologies = [
      { label: 'General', value: 'general' },
      { label: 'Artificial Intelligence (AI) and Machine Learning (ML)', value: 'ai' },
      { label: 'Data Science and Big Data', value: 'ds' },
      { label: 'Cybersecurity', value: 'cyber' },
      { label: 'Software Engineering', value: 'swe' },
      { label: 'Web Development', value: 'web' },
      { label: 'Mobile Development', value: 'mobile' },
      { label: 'Networks and Communications', value: 'network' },
      { label: 'Robotics', value: 'robotic' },
      { label: 'Business', value: 'business' },
      { label: 'Medical', value: 'medical' },
      { label: 'Financial', value: 'financial' },
      { label: 'Educational', value: 'educational' },
    ];
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  onUpload(event: UploadEvent): void {
    debugger;
  }

  submit(): void {
    const engine = this.selectedEngine;
    const isTranslateImage = this.isTranslateImage;
    const terminology = this.selectedTerminology;

    console.log(engine, isTranslateImage, terminology);
  }
}
