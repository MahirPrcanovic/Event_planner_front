export interface Comment {
  id: string;
  comment: string;
  appUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isBanned: boolean;
  };
  dateCreated: string;
}
