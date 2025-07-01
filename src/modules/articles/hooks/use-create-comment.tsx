import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import type { LikeResponse } from '@modules/articles/types';
import type { ChangeEvent } from 'react';
import { API_ENDPOINTS, apiClient, queryClient, queryKeys } from '@kernel/index';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

type SuccessResponse = ApiSuccessResponse<LikeResponse>;
type ErrorResponse = ApiErrorResponse;

interface Comment {
  content: string;
}

export function useCreateComment(id: string) {
  const [content, setContent] = useState<string>('')

  const { mutateAsync, isPending } = useMutation<SuccessResponse, ErrorResponse, Comment>({
    mutationKey: queryKeys.articles.comment(id),
    mutationFn: ({ content }) => apiClient.post(`${API_ENDPOINTS.articles.comment(id)}`, { content }),
  });

  const createComment = async (content: Comment) => {
    const res = await mutateAsync(content)

    if (res.success) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.all,
      });

      if (res.message) {
        toast.success(res.message)
      }
    }
    else {
      toast.error(res.message)
    }
  };

  const handleChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleSubmitComment = async () => {
    const newComment = content.trim();
    await createComment({ content: newComment })
    setContent('')
  }

  return {
    value: content,
    handleChangeComment,
    handleSubmitComment,
    isValid: content.trim().length > 5,
    isLoading: isPending,
  }
}
