import { environment } from 'src/environments/environment';

export class User {
  constructor(
    public name: string,
    public email: string,
    public id?: string,
    public password?: string,
    public image?: string,
    public google?: boolean,
    public role?: string
  ) {}

  get getUserPicture() {
    if (this.google) return this.image;
    if (this.image) {
      return `${environment.base_url}/upload/user/${this.image}`;
    } else {
      return `${environment.base_url}/upload/user/no-image`;
    }
  }
}
