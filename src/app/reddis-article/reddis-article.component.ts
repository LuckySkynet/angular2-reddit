import { Component, OnInit, Input } from '@angular/core';
import { Article } from './article';

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

  constructor() {
  }

  ngOnInit() {
  }

  voteUp(){
    this.article.voteUp();
  }

  voteDown(){
    this.article.voteDown()
  }

}
