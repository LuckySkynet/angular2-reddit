import { Component, OnInit, Input, Host, forwardRef, Inject } from '@angular/core';
import { Article } from './article';
import { AppComponent } from '../app.component';

@Component({
  selector: 'reddis-article',
  host: {
    class: 'row'
  },
  templateUrl: './reddis-article.component.html',
  styleUrls: ['./reddis-article.component.css']
})
export class ReddisArticleComponent implements OnInit {

  @Input()
  article: Article;

  articles: Article[];

  constructor( @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent ) {
    this.articles = app.articles;
  }

  ngOnInit() {
  }

  voteUp() {
    this.article.voteUp();
  }

  voteDown() {
    this.article.voteDown()
  }

  removeArticle(article: Article) {
    const index = this.articles.indexOf(article);
    if (index > -1) {
      this.articles.splice(index, 1);
    }
  }

}
