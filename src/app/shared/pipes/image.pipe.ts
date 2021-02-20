import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(image: string = '', type: string): string {
    if (image.includes('https')) return image;
    if (image) {
      return `${environment.base_url}/upload/${type}/${image}`;
    } else {
      return `${environment.base_url}/upload/user/no-image`;
    }
  }
}
