import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatIconModule} from '@angular/material/icon';

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
    ],
  templateUrl: './add-post-page.component.html',
  styleUrl: './add-post-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class AddPostPageComponent {
  formGroup: FormGroup;
  text!: string;
  value: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      text: ['']
    })
  }

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<Tag[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.update(tags => [...tags, {name: value}]);
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

      tags.splice(index, 1);
      this.announcer.announce(`Удалить ${tag.name}`);
      return [...tags];
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
}
