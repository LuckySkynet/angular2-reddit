import { Component, Output } from '@angular/core';
import { Article } from './reddis-article/article';

@Component({
  selector: 'reddit',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  articles: Article[];

  constructor() {
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

  @Output()
  removeArticle(article: Article): void {
    const index = this.articles.indexOf(article);
    if (index > -1) {
      this.articles.splice(index, 1);
    }
  }

}
