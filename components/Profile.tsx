import { Post } from '../types/post';
import PromptCard from './PromptCard';

type ProfileProps = {
  name: string;
  desc: string;
  data: Post[];
  handleTagClick: (tag: string) => void;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
};

export default function Profile({
  name,
  desc,
  data,
  handleTagClick,
  handleEdit,
  handleDelete,
}: ProfileProps) {
  return (
    <section className="w-full">
      <h1 className="text-left head_text">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="text-left desc">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit={() => handleEdit(post)}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}
