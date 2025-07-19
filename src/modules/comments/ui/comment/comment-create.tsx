import type { User } from '@kernel/types';
import { Button, Flex } from '@radix-ui/themes';
import { TextArea } from '@radix-ui/themes/src/index.js';
import { useState } from 'react';
import { CommentAuthor } from './comment-author';

interface CommentCreateProperties {
  user: User;
  onCreateComment?: (content: string) => Promise<void>;
  isLoading?: boolean;
}

export function CommentCreate({
  user,
  onCreateComment,
  isLoading: externalIsLoading = false,
}: CommentCreateProperties) {
  const [content, setContent] = useState('');
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = externalIsLoading || internalLoading;
  const isValid = content.trim().length > 5;

  const handleSubmit = async () => {
    if (!isValid || isLoading) return;

    setInternalLoading(true);
    try {
      if (onCreateComment) {
        await onCreateComment(content.trim());
      }
      setContent(''); // Очищаем поле после успешного создания
    }
    catch (error) {
      console.error('Error creating comment:', error);
    }
    finally {
      setInternalLoading(false);
    }
  };

  return (
    <Flex direction="column" width="100%">
      <CommentAuthor author={user} createdAt={new Date()} />
      <TextArea
        disabled={isLoading}
        mt="2"
        placeholder="What are your thoughts?"
        value={content}
        onChange={(event) => { setContent(event.target.value); }}
      />
      <Flex justify="end" align="center" mt="2">
        <Button
          disabled={!isValid || isLoading}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Respond
        </Button>
      </Flex>
    </Flex>
  );
}
