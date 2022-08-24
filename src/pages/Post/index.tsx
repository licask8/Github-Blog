import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { IPost } from "../Blog";
import { PostContent } from '../Blog/components/PostContent'
import { PostHeader } from "./components/PostHeader";

const username = import.meta.env.VITE_GITHUB_USERNAME;
const repoName = import.meta.env.VITE_GITHUB_REPONAME;

export function Post() {
    const [postData, setPostData] = useState<IPost>({} as IPost)
    const [loading, setLoading] = useState(true)

    const { id } = useParams();
    
    const getPostDetails = useCallback(async () => {
        try {
            setLoading(true)

            const response = await api.get(`/repos/${username}/${repoName}/issues/${id}`)
            setPostData(response.data)
            

        } finally {
            setLoading(false);
        }
    }, [postData])

    useEffect(() => {
        getPostDetails()
    }, [])

    return(
        <>
            <PostHeader postData={postData} isLoading={loading} />
            {!loading && <PostContent content={postData.body} />}
        </>
    )
}