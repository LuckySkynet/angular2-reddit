import { Component, OnInit, Input, Host, forwardRef, Inject, ViewChild, ElementRef } from '@angular/core';
import { Article } from './article';
import { AppComponent } from '../app.component';

declare var jQuery: any;

@Component({
  selector: 'reddit-article',
  host: {
    class: 'row'
  },
  templateUrl: './reddit-article.component.html',
  styleUrls: ['./reddit-article.component.css']
})
export class RedditArticleComponent implements OnInit {

  @Input() article: Article;

  @ViewChild('closeArt') closeArt: ElementRef;

  articles: Article[];

  constructor( @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent) {
    this.articles = app.articles;
  }

  ngOnInit() {
    jQuery(this.closeArt.nativeElement.parentElement).transition('fade in');
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
      //angular2使用jQuery：首先声明jQuery对象
      //1、导入ElementRef, ViewChild模块
      //2、通过@ViewChild('close') close: ElementRef的方式传入模板引用变量，创建元素引用对象
      //3、调用对象的nativeElement获取原生的元素，即可使用js方法
      jQuery(this.closeArt.nativeElement.parentElement).transition('fade out');
      setTimeout(() => this.articles.splice(index, 1), 500);
    }
  }

}
