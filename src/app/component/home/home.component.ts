import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { TranslateDto } from 'src/app/models/translate';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from 'src/app/services/user.service';

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
  file!: File;
  engines: SelectItem[] = [];
  languages: SelectItem[] = [];
  selectedEngine!: string;
  isTranslateImage: boolean = true;
  sourceLanguage!: string;
  previousSourceLanguage!: string;
  targetLanguage!: string;
  previousTargetLanguage!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.initSelectItems();
  }

  initSelectItems(): void {
    this.engines = [
      { label: 'Google Translate', value: 'google' },
      { label: 'ChatGPT', value: 'chatgpt' },
      { label: 'Microsoft Translator', value: 'microsoft' },
      { label: 'Amazon Translate', value: 'amazon' },
      { label: 'DeepL', value: 'deepl' },
    ];

    this.languages = [
      { label: 'English', value: 'en-US', },
      { label: 'French', value: 'fr-FR', },
    ];

    this.sourceLanguage = 'fr-FR';
    this.previousSourceLanguage = this.sourceLanguage;

    this.targetLanguage = 'en-US';
    this.previousTargetLanguage = this.targetLanguage;
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      // localStorage.clear();
      // this.router.navigate(['auth/login']);
    });
  }

  onSelectFile(event: any): void {
    this.file = event.currentFiles[0];
  }

  onSourceLanguageChanged(event: any): void {
    if (event.value === this.targetLanguage) {
      this.targetLanguage = this.previousSourceLanguage;
      this.previousTargetLanguage = this.targetLanguage;

      this.previousSourceLanguage = event.value;
    }
  }

  onTargetLanguageChanged(event: any): void {
    if (event.value === this.sourceLanguage) {
      this.sourceLanguage = this.previousTargetLanguage;
      this.previousSourceLanguage = this.sourceLanguage;

      this.previousTargetLanguage = event.value;
    }
  }

  submit(): void {
    const dto: TranslateDto = {
      file: this.file,
      engine: this.selectedEngine,
      is_translate_image: this.isTranslateImage,
      source_language: this.sourceLanguage,
      target_language: this.targetLanguage,
    };

    this.translateService.translate(dto).subscribe((res: any) => {
      const hexId = res.document.hexId;
      const name = res.document.name;

      this.translateService.download(hexId, name);
    });
  }
}
