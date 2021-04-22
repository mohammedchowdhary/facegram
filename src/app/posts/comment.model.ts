export interface Comment {
  id: string;
  text: string;
  creator: {
    id: string,
    username: string
  };
}
