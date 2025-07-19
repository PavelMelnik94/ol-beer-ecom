import type { ChangeEvent } from 'react';
import { useUploadAvatar } from '@modules/user/hooks';
import { Avatar, Flex, Spinner } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { useRef, useState } from 'react';

interface AvatarUploaderProperties {
  avatarUrl?: string | null;
  fallback?: string;
}

export function AvatarUploader({ avatarUrl, fallback = 'User' }: AvatarUploaderProperties) {
  const [preview, setPreview] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const inputReference = useRef<HTMLInputElement>(null);
  const uploadAvatar = useUploadAvatar();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? undefined;
    if (!file) return;
    setLoading(true);
    try {
      const avatarUploadResponse = await uploadAvatar.mutateAsync({ avatar: file });
      if (avatarUploadResponse.success && avatarUploadResponse.data?.avatarUrl) {
        setPreview(avatarUploadResponse.data.avatarUrl);
      }
      else {
        setPreview(URL.createObjectURL(file));
      }
    }
    catch {
      setPreview(undefined);
    }
    finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    inputReference.current?.click();
  };

  return (
    <Flex direction="column" gap="3" align="center">
      <Show when={!loading}>
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
          }}
          onClick={handleClick}
          aria-label="Upload avatar"
        >
          <Avatar
            src={preview ?? avatarUrl ?? undefined}
            fallback={fallback}
            size="6"
            style={{ cursor: 'pointer' }}
            onClick={handleClick}
          />
        </button>

      </Show>

      <Show when={loading}>
        <Avatar
          src={undefined}
          fallback={<Spinner size="3" />}
          size="6"
          style={{ cursor: 'pointer' }}
        />
      </Show>
      <input
        ref={inputReference}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={loading}
      />
    </Flex>
  );
}
