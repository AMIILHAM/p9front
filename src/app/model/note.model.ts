export interface INote {
  id?: string,
  patientId?: number,
  patientName?: string,
  dateNote?: Date,
  note?: string
}

export class Note implements INote{
  constructor(
  public id?: string,
  public patientId?: number,
  public patientName?: string,
  public dateNote?: Date,
  public note?: string) {}

}
