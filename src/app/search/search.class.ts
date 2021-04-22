export class User {
  constructor(public _id: number, public email: string) {}
}

export interface IUserResponse {
  total: number;
  results: User[];
}
