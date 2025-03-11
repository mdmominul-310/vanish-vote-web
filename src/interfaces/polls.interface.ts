export interface IPOll {
  _id?: string;
  id: string;
  question: string;
  experationDate: Date;
  options: [
    {
      name: string;
      votes: number;
      _id?: string;
    }
  ];
}
