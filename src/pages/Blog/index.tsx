import { Post } from "./components/Post";
import { Profile } from "./components/Profile";
import { SearchInput } from "./components/SearchInput";
import { PostsListContainer } from "./style";

export function Blog() {
    return (
        <>
            <Profile />
            <SearchInput />

            <PostsListContainer>
                <Post />
                <Post />
                <Post />
            </PostsListContainer>
        </>
    )
}