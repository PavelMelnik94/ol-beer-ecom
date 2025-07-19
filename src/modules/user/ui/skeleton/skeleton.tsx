import { Flex, Skeleton } from '@radix-ui/themes';
import skeletonStyles from './skeleton.module.scss';

interface WidgetSkeletonProperties {
  height?: number | string;
  width?: number | string;
  className?: string;
}

export const WidgetSkeleton: React.FC<WidgetSkeletonProperties> = ({ height = 120, width = '100%', className }) => (
  <Skeleton className={className ?? skeletonStyles.profileSkeletonWidget} style={{ height, width }} />
);

export function ProfileSkeleton({ isOneColumn }: { isOneColumn: boolean; }) {
  return (
    <Flex direction="column" className={skeletonStyles.profileSkeletonLayout}>
      <Skeleton className={skeletonStyles.profileSkeletonHeader} />
      {isOneColumn
        ? (
            <Flex direction="column" gap="4">
              <WidgetSkeleton />
              <WidgetSkeleton />
              <WidgetSkeleton />
              <WidgetSkeleton />
              <WidgetSkeleton />
            </Flex>
          )
        : (
            <div className={skeletonStyles.profileSkeletonMainGrid}>
              <Flex direction="column" gap="4" className={skeletonStyles.profileSkeletonLeftCol}>
                <WidgetSkeleton />
                <WidgetSkeleton />
              </Flex>
              <Flex direction="column" gap="4" className={skeletonStyles.profileSkeletonRightCol}>
                <WidgetSkeleton />
                <WidgetSkeleton />
                <WidgetSkeleton />
              </Flex>
            </div>
          )}
    </Flex>
  );
}
