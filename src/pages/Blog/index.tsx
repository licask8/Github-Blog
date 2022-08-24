import { useCallback, useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner";
import { api } from "../../lib/axios";
import { Post } from "./components/Post";
import { Profile } from "./components/Profile";
import { SearchInput } from "./components/SearchInput";
import { PostsListContainer } from "./style";

const username = import.meta.env.VITE_GITHUB_USERNAME;
const repoName = import.meta.env.VITE_GITHUB_REPONAME;


export interface IPost {
    title: string;
    body: string;
    created_at: string;
    number: number;
    html_url: string;
    comments: number;
    user: {
        login: string;
    };

}

export function Blog() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

    const getPosts = useCallback(async (query: string = "") => {
        try {
            setLoading(true);
            const response = await api.get(`/search/issues?q=${query}%20repo:${username}/${repoName}`);
           

            setPosts(response.data.items)
        } finally {
            setLoading(false)
        }
    }, [posts])

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <Profile />
            <SearchInput postsLengh={posts.length} getPosts={getPosts} />

            {loading ? (
                <Spinner />
            ): (
                <PostsListContainer>
                {posts.map((post) => (
                    <Post key={post.number} post={post} />
                ))}

            </PostsListContainer>
            )}
        </>
    )
}