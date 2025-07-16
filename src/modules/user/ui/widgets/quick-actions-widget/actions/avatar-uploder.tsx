import type { ChangeEvent } from 'react';
import { useUploadAvatar } from '@modules/user/hooks';
import { Avatar, Flex, Spinner } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { useRef, useState } from 'react';

interface AvatarUploaderProps {
  avatarUrl?: string | null;
  fallback?: string;
}

export function AvatarUploader({ avatarUrl, fallback = 'User' }: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadAvatar = useUploadAvatar();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setLoading(true);
    try {
      const res = await uploadAvatar.mutateAsync({ avatar: file });
      if (res.success && res.data?.avatarUrl) {
        setPreview(res.data.avatarUrl);
      }
      else {
        setPreview(URL.createObjectURL(file));
      }
    }
    catch {
      setPreview(null);
    }
    finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <Flex direction="column" gap="3" align="center">
      <Show when={!loading}>
        <Avatar
          src={preview ?? avatarUrl ?? undefined}
          fallback={fallback}
          size="6"
          style={{ cursor: 'pointer' }}
          onClick={handleClick}
        />
      </Show>

      <Show when={loading}>
        <Avatar
          src={undefined}
          fallback={<Spinner size="3" />}
          size="6"
          style={{ cursor: 'pointer' }}
          onClick={handleClick}
        />
      </Show>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={loading}
      />
    </Flex>
  );
}
