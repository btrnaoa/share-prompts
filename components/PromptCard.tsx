'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Post } from '../types/post';

type PromptCardProps = {
  post: Post;
  handleTagClick: (tag: string) => void;
  handleEdit: () => void;
  handleDelete: () => void;
};

export default function PromptCard({ post, handleTagClick }: PromptCardProps) {
  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        {post.creator && (
          <div className="flex items-center justify-start flex-1 gap-3 cursor-pointer">
            <Image
              src={post.creator.image}
              width={40}
              height={40}
              alt="User"
              className="object-contain rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-900 font-satoshi">
                {post.creator.username}
              </h3>
              <p className="text-sm text-gray-500 font-inter">
                {post.creator.email}
              </p>
            </div>
          </div>
        )}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
            alt="Copy"
          />
        </div>
      </div>
      <p className="my-4 text-sm text-gray-700 font-satoshi">{post.prompt}</p>
      <p
        className="text-sm cursor-pointer font-inter blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
}
