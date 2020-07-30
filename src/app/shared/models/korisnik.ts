export class Korisnik {
  email: string;
  korisnickoIme: string;
  ime: string;
  prezime: string;
  bibliotekaNaziv: string;
  slika: string;
  token: string;

  constructor(Email: string, KorisnickoIme: string, Ime: string, Prezime: string, BibliotekaNaziv: string, Slika: string, Token: string) {
    this.email = Email;
    this.korisnickoIme = KorisnickoIme;
    this.ime = Ime;
    this.prezime = Prezime;
    this.bibliotekaNaziv = BibliotekaNaziv;
    this.slika = Slika;
    this.token = Token;
  }
}
