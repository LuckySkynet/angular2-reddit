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

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const regExp: string = '((https|http)\:\/\/) ((([0-9]{1,3}\.){3}[0-9]{1,3}) | (([0-9a-z]+\.)*)) ([a-z]{2,6}) (:[0-9]{1,4})? (\/[a-z]+)*';
    this.articleForm = this.fb.group({
      'title': [this.articles.forEach(article => article.title), Validators.compose([
        Validators.required,
        Validators.minLength(4)]
      )],
      'link': [this.articles.forEach(article => article.link), Validators.compose([
        Validators.required,
        Validators.pattern(regExp)]
      )]
    })
  }

  validationMessages = {
    'title': {
      'required': 'title is required.',
      'minlength': 'title must be at least 4 characters long.',
    },
    'link': {
      'required': 'link is required.',
      'pattern': 'link must be a valid URL'
    }
  };

  formError = {
    'title':'',
    'link':''
  }

}
