import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SafeContentPipe} from '../../../core/pipes/safe-content.pipe';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SafeContentPipe
  ]
})
export class ArticleComponent {
  @Input() articlePreview: boolean = true;

  public articleText: string = `
    Привет! Меня зовут Андрей, я занимаюсь фронтенд разработкой на Angular. И в последнее время данный фреймворк нравится мне все больше и больше, поэтому мне стало очень интересно, что же ждет Angular в 2025 году. Какие интересные и полезные фичи завезут и вообще, какой вектор развития у фреймворка.
    <br>
    <br>
    Не найдя ни одной статьи на русском на это тему — родилась эта :-)
    <br>
    <br>
    Я разобрал официальную <a href="#">дорожную карту Angular</a> и их <a href="#">стратегию на ближайшие годы</a>. Впереди ускорение, упрощение, новая реактивность и стабильная (возможно) жизнь без zone.js. Давай разбираться, что нас ждёт!
  `
}
