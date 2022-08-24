import { SearchInputContainer } from "./styles";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'


const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInput = z.infer<typeof searchFormSchema>

interface SearchInputProps {
    postsLengh: number
    getPosts: (query?: string) => Promise<void>
    
}

export function SearchInput({ getPosts, postsLengh }: SearchInputProps) {
    const { handleSubmit ,register } = useForm<SearchFormInput>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchPosts(data: SearchFormInput) {
        await getPosts(data.query)
    }

    return (
        <SearchInputContainer onSubmit={handleSubmit(handleSearchPosts)}>
            <header>
                <h3>Publicações</h3>
                <span>{postsLengh} Publicações</span>
            </header>

            <input type="text" placeholder="Buscar conteúdo" {...register("query")} />
        </SearchInputContainer>
    )
}