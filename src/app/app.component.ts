import { Component, OnInit } from '@angular/core';
import { Article } from './reddit-article/article';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var jQuery: any;

@Component({
  selector: 'reddit',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  articleForm: FormGroup;
  articles: Article[];
  active: boolean = true;

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

  formErrors = {
    'title': '',
    'link': ''
  }

  constructor(private fb: FormBuilder) {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];
  }

  addArticle() {
    //this.articleForm.value 能够获取该formGroup中的formControl对象的值
    this.articles.push(new Article(this.articleForm.value['title'], this.articleForm.value['link']));
    this.articleForm.reset();
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes)
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    //注意：正则表达式不能带有空格
    const regExp: string = '((https|http)\:\/\/)((([0-9]{1,3}\.){3}[0-9]{1,3})|(([0-9a-z]+\.)*))([a-z]{2,6})(:[0-9]{1,4})?(\/[a-z]+)*';
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
    this.articleForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.articleForm) { return; }
    const form = this.articleForm;
    for (const field in this.formErrors) {
      //重置错误消息
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
