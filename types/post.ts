export type Post = {
  _id?: string;
  creator?: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
  prompt: string;
  tag: string;
};
