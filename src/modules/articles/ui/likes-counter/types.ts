export interface LikesCounterProps {
  likesCount: number
  heartSize?: number
  textSize?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  onClick?: (likeState: boolean) => void
}
