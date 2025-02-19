import {Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {HotToastService} from '@ngxpert/hot-toast';


interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {

  @Output() imagesChanged = new EventEmitter<File[]>();

  isDragging = signal(false);
  images = signal<UploadedImage[]>([]);

  private toast = inject(HotToastService);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelect(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  private async handleFiles(files: File[]) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length !== files.length) {
      this.toast.error('Only image files are allowed');
    }

    const newImages = await Promise.all(
      imageFiles.map(async file => ({
        id: crypto.randomUUID(),
        file,
        preview: await this.createPreview(file)
      }))
    );

    this.images.update(current => [...current, ...newImages]);
    this.emitChanges();
  }

  private createPreview(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  }

  removeImage(id: string) {
    this.images.update(current => current.filter(img => img.id !== id));
    this.emitChanges();
  }

  downloadImage(image: UploadedImage) {
    const link = document.createElement('a');
    link.href = image.preview;
    link.download = image.file.name;
    link.click();
  }

  private emitChanges() {
    this.imagesChanged.emit(this.images().map(img => img.file));
  }

}
