
import { relativeDateFormatter } from '../../../../utils/formmatter'
import { PostContainer } from "./styles";
import { IPost } from "../..";

interface PostProps {
    post: IPost;
}

export function Post({ post }: PostProps) {

    const formattedDate = relativeDateFormatter(post.created_at)


    return (
        <PostContainer to={`/post/${post.number}`}>
            <div>
                <strong>{post.title}</strong>
                <span>{formattedDate}</span>
            </div>
            
            <p>
               {post.body}
            </p>
        </PostContainer>
    )
}    