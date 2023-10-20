import CommentArea from "@/app/components/Comment/CommentArea";
import CommentList from "@/app/components/Comment/CommentList";
import CommentPostDisplay from "@/app/components/Comment/CommentPostDisplay";

const Post = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <CommentPostDisplay postId={parseInt(params.id)} />
      <CommentArea postId={parseInt(params.id)} />
      <CommentList postId={parseInt(params.id)} />
    </>
  );
};

export default Post;
