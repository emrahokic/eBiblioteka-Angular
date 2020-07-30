import {Korisnik} from '../shared/models/korisnik';

export class SessionUser{
  Role: string;
  Email: string;
  KorisnickoIme: string;
  Ime: string;
  Prezime: string;
  BibliotekaNaziv: string;
  Slika: string;
  private _JWT: string;
  // tslint:disable-next-line:variable-name
  private _tokenExpirationDate: Date;

  // tslint:disable-next-line:max-line-length
  constructor(Role: string, Email: string, KorisnickoIme: string, Ime: string, Prezime: string, BibliotekaNaziv: string, Slika: string, JWT: string, tokenExpirationDate: Date) {
    this.Role = Role;
    this.Email = Email;
    this.KorisnickoIme = KorisnickoIme;
    this.Ime = Ime;
    this.Prezime = Prezime;
    this.BibliotekaNaziv = BibliotekaNaziv;
    this.Slika = Slika;
    this._JWT = JWT;
    this._tokenExpirationDate = tokenExpirationDate;
  }

  get ExpDate(): Date{
    return this._tokenExpirationDate;
  }
  get Token(): string{
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._JWT;
  }
}
