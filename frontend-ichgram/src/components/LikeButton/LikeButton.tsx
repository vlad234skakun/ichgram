import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeToggle , getLikeInfo } from '../../shared/api/posts-api';

// interface LikeButtonProps {
//   initialLiked?: boolean;
//   onToggle?: (liked: boolean) => void;
// }

interface LikeButtonProps { 
	postId: string
  setLikeCount: any
}

export default function LikeButton({postId , setLikeCount}: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);


	useEffect(()=> {
			const fetchLikeStatus = async() => {
				try {
					const { liked, count } = await getLikeInfo(postId)	 
					setLiked(liked);
          setCount(count)
          setLikeCount(count)
				} catch (error) {
					console.error("Error fetching like status:", error);
				}
			}
			fetchLikeStatus();
	}, [])

   const handleToggle = async () => {
    try {
      const { liked } = await likeToggle(postId);
			setLiked(liked);
      const newCount = liked ? count + 1 : count - 1;
    setCount(newCount);
    setLikeCount(newCount);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      {liked ? <FaHeart color="red" size={24} /> : <FaRegHeart size={24} />}
    </button>
  );
}
