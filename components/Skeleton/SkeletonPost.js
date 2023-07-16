import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import space from '../../commons/variable/space';
import flex from '../../commons/variable/flex';
import color from '../../commons/variable/color';

let PostSkeleton = (props) => {

    return (
        <SkeletonPlaceholder backgroundColor={color.skeleton}>
            <SkeletonPlaceholder.Item marginBottom={space.sp10} marginLeft={space.sp10} flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item width={30} height={30} borderRadius={50} />
                <SkeletonPlaceholder.Item marginLeft={10}>
                    <SkeletonPlaceholder.Item width={80} height={10} />
                    <SkeletonPlaceholder.Item marginTop={5} width={80} height={10} />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item marginHorizontal={space.sp10}  height={300} marginTop={10}>
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item marginTop={space.sp5} marginBottom={space.sp20} marginHorizontal={space.sp10} flexDirection={flex.row} justifyContent={flex.spaceBetween}>
                <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
                <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
                <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
            </SkeletonPlaceholder.Item>

        </SkeletonPlaceholder>
    )
}

export default PostSkeleton;
