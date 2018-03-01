import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Article } from './article';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string;
  articles: Array<Article>;
  editing: boolean;
  editArticle: Article;

  constructor(private articleService: ArticleService) {
    this.editing = false;
    this.editArticle = new Article();
    this.title = 'Better blog';
    this.articles = new Array();
    // this.articles.push(new Article(99, 'Article de test', 'Super description...'));
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.articleService.list().subscribe({
      next: articles => {
        this.articles = articles;
      },
      error: response => {
        console.log('impossible de recuperer les articles dand le fichier Json', response);
      },
    });
  }

  addArticle() {
    this.editing = true;
  }

  backToList() {
    setTimeout(() => (this.editing = false));
  }

  saveArticle(myForm: NgForm) {
    // Utilisation de JSON pour sérialiser puis déserialiser l'article afin
    // d'obtenir une nouvelle instance d'objet utilisant une autre adresse mémoire.
    if (this.editArticle.id) {
      this.articleService.update(this.editArticle).subscribe(article => {
        // remplacer l'article à jour dans la liste
        const index = this.articles.findIndex((value: Article) => value.id === article.id);

        this.articles.splice(index, 1, article);
      });
    } else {
      this.articleService.create(this.editArticle).subscribe(article => this.articles.push(article));
    }
    this.editArticle.id = undefined;
    myForm.resetForm();
  }

  modifyArticle(id: number, index: number) {
    this.editArticle = this.articles[index];
    // basculer affichage vers le formulaire

    this.addArticle();
  }
  deleteArticle(id: number, index: number) {
    this.articles.splice(index, 1);
  }
}
