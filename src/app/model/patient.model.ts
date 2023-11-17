export interface IPatient{
  id?: number,
  nom?: string,
  prenom?: string,
  dateNaissance?: Date,
  genre?: string,
  adressePostale?: string,
  numTelephone?: string
}

export class Patient implements IPatient{
  constructor(
  public adressePostale?: string,
  public dateNaissance?: Date,
  public genre?: string,
  public id?: number,
  public nom?: string,
  public numTelephone?: string,
  public prenom?: string) {}

}
