import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { url, urlResponse } from '../model';
import { ShortenService } from '../shorten.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms 100ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms 100ms', style({ opacity: 0, transform: 'translateX(10px)' })),
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {

  labelHide:boolean;
  label: String;
  isError: boolean;
  showresult:boolean;
  progressBar:boolean;
  result:url | undefined;
  url: FormGroup;

  constructor(private service: ShortenService) { 
    this.label = "";
    this.labelHide = true;
    this.isError = false;
    this.showresult = false;
    this.progressBar = false;
    this.url = new FormGroup({
      url: new FormControl(null, Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(2), // Minimum length is 5 characters
        Validators.maxLength(2048), // Maximum length is 30 characters
      ]))
    });
  }

  ngOnInit(): void {
  }

  saveURL(){
    console.log("save url called");
    this.labelHide = true;
    // this.url.controls['url'].disable();
    if(this.url.get('url')?.value!=undefined){
      let url = {
        originalUrl: this.url.get('url')?.value
      }
      console.log(url);
      this.service.saveURL(url).subscribe({
        next: this.updateResult.bind(this)
     });
      this.progressBar = true;
    }
    else{
      console.log("invalid url");
      this.isError = true;
      this.labelHide = false;
      this.label = "Invalid URL";
      // this.url.controls['url'].enable();
    }
  }

  updateResult(result:urlResponse){
    console.log(result);
    if(result.success == true){
      this.isError = false;
      this.labelHide = true;
      this.showresult =true;
      this.progressBar = false;
      this.result = result.data;
      // this.url.controls['url'].enable();
    }
    else{
      this.isError = true;
      this.labelHide = false;
      this.progressBar = false;
      this.label = result.message;
      this.showresult =false;
      // this.url.controls['url'].enable();
    }
  }

}
