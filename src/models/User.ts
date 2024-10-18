export type User = {
  id: string | null;
  password: string | null;
  name: string | null;
  avatarURL: string | null;
  answers: any;
  questions: Array<string>;
};
