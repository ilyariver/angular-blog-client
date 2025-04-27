import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {AddPostPageService} from './add-post-page.service';
import {ToastService} from '../../shared/services/toast.service';
import {AddPostPage} from './add-post-page.models';
import {API_BASE_URL} from '../../app.config';
import {MatDialog} from '@angular/material/dialog';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-add-post-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    QuillEditorComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './add-post-page.component.html',
  styleUrl: './add-post-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostPageComponent {
  public formPost!: FormGroup;
  public value: string = '';
  public imgUrl: string | null = null;
  public file: File | null = null;

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<Tag[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    private addPostPageService: AddPostPageService,
    private toast: ToastService,
    private router: Router,
    @Inject(API_BASE_URL) private baseUrl: string,
    private cdk: ChangeDetectorRef,
  ) {
    this.initForm();
    this.setDefaultTags();
  }

  private initForm(): void {
    this.formPost = this.fb.group({
      imageUrl: [''],
      title: ['Zalupa', [Validators.required, Validators.minLength(3)]],
      tags: [null, [Validators.required, Validators.minLength(3)]],
      text: ['', Validators.required],
    })
  }

  private setDefaultTags(): void {
    const tags: string[] = ['her', 'hui', 'kon'];
    if (tags?.length) {
      this.tags.set(tags.map((name: any) => ({ name })));
      const updatedTags = [...this.tags()];
      this.formPost.get('tags')!.setValue(updatedTags.map(tag => tag.name));
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.update(tags => {
        const updatedTags = [...tags, { name: value }];
        this.formPost.get('tags')!.setValue(updatedTags.map(tag => tag.name));
        return updatedTags;
      });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }
      const updatedTags = [...tags];
      updatedTags.splice(index, 1);
      this.announcer.announce(`Удалить ${tag.name}`);
      this.formPost.get('tags')!.setValue(updatedTags.map(tag => tag.name));
      return updatedTags;
    });
  }

  edit(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags[index].name = value;
        return [...tags];
      }
      return tags;
    });
  }

  onFileSelected(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);
      // Проверка типа файла
      if (!file.type.match('image.*')) {
        this.toast.show('error', 'Неверный формат.', 'Пожалуйста, выберите файл изображения.');
        return;
      }
      // Проверка размера файла (например, не более 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.toast.show('error', 'Большой файл.', 'Размер файла не должен превышиать 5Мб.');
        return;
      }
      this.file = file;
      this.uploadOnServer(formData)
    }
  }

  private uploadOnServer(formData: FormData): void {
    this.addPostPageService.uploadImage(formData)
      .subscribe({
        next: (res: any) => {
          this.imgUrl = `${this.baseUrl}${res.url}`;
          this.cdk.detectChanges();
        },
        error: (err) => {
          this.toast.show('error', 'Ошибка загрузки.', err.message);
        },
        complete: () => {
          this.toast.show('success', 'Успешно.', 'Картинка загружена.')
        }
      })
  }
  deleteImg() {
    this.file = null;
    this.imgUrl = null;
  }

  send(): void {
    if (this.formPost.invalid) {
      return;
    }
    // ToDO Временное решение для удаления неразрывных пробелов.
    //  Удалить, если уберут ошибку в пакете Quill-editor.
    const params = {
      ...this.formPost.value,
      text: this.formPost.value.text.replace(/&nbsp;/g, ' '),
    };
    this.addPostPageService.createNewPost(params)
      .subscribe({
        next: (res: AddPostPage) => {
          console.log(res)
          this.toast.show('success', 'Успешно.', `Статья "${res.title || 'Новая статья'}" создана!`)
        },
        error: (err) => {
          debugger
          this.toast.show('error', 'Ошибка.', err.message);
        },
        complete: () => {
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      });
  }
}
