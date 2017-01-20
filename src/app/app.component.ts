import { Component, OnInit } from '@angular/core';
import { Article } from './reddit-article/article';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reddit',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  articleForm: FormGroup;
  articles: Article[];

  constructor(private fb: FormBuilder) {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement) {
    this.articles.push(new Article(title.value, link.value));
    title.value = '';
    link.value = '';
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes)
  }

  ngOnInit(){
    this.articleForm = this.fb.group({
      'titleControl':['',Validators.compose([Validators.required,Validators.minLength(4)])],
      'linkControl':['',Validators.compose([Validators.required,Validators.minLength(4)])]
    })
  }

}
