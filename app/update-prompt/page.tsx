'use client';

import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Post } from '../../types/post';

export default function EditPrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    if (!promptId) {
      return;
    }
    fetch(`/api/prompt/${promptId}`)
      .then((res) => res.json())
      .then((data) =>
        setPost((prev) => ({
          ...prev,
          prompt: data.prompt,
          tag: data.tag,
        })),
      );
  }, [promptId]);

  const updatePrompt: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      return;
    }

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}
