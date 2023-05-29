export type Post = {
  creator?: {
    username: string;
    email: string;
    image: string;
  };
  prompt: string;
  tag: string;
};
