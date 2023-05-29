'use client';

import { useEffect, useState } from 'react';
import { Post } from '../types/post';
import PromptCard from './PromptCard';

type PromptCardListProps = {
  data: Post[];
  handleTagClick: () => void;
};

function PromptCardList({ data, handleTagClick }: PromptCardListProps) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

export default function Feed() {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {};

  useEffect(() => {
    fetch('/api/prompt')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}
