'use client';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Post } from '../../types/post';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`/api/users/${session?.user.id}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [session]);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?',
    );

    if (!hasConfirmed) {
      return;
    }

    try {
      await fetch(`/api/prompt/${post._id?.toString()}`, {
        method: 'DELETE',
      });
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleTagClick={() => {}}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
