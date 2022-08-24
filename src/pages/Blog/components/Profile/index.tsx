import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLink } from "../../../../components/ExternalLink";
import { ProfileContainer, ProfileDetails, ProfilePicture } from "./styles";
import { faGithub} from '@fortawesome/free-brands-svg-icons'
import { faBuilding, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../../lib/axios";
import { Spinner } from "../../../../components/Spinner";


const username = import.meta.env.VITE_GITHUB_USERNAME;


interface ProfileData {
    login: string;
    bio: string;
    avatar_url: string;
    html_url: string;
    name: string;
    company?: string;
    followers: number;
}

export function Profile() {
    const [profileData, setProfileData] = useState<ProfileData>({} as ProfileData)
    const [loading, setLoading] = useState(true)

    const getProfileData = useCallback(async () => {
        try {
            setLoading(true)

            const response = await api.get(`/users/${username}`)
            setProfileData(response.data)
         

        } finally {
            setLoading(false)
        }
    }, [profileData])

    useEffect(() => {
        getProfileData()
    }, [])


    return (

        <ProfileContainer>
           {loading ? (
            <Spinner />
           ): (
            <>
                 <ProfilePicture src={profileData.avatar_url} />

            <ProfileDetails >
                <header>
                    <h1>{profileData.name} </h1>

                    <ExternalLink text="Github" href={profileData.html_url} target="_blank" />
                </header>

                <p> {profileData.bio} </p>

                <ul>
                    <li>
                        <FontAwesomeIcon icon={faGithub}/>
                    {profileData.login}
                    </li>

                        {profileData?.company && (
                        <li>
                        <FontAwesomeIcon icon={faBuilding}/>
                    {profileData.company}
                    </li>
                    )}

                    <li>
                        <FontAwesomeIcon icon={faUserGroup}/>
                    {profileData.followers} seguidores
                    </li>
                </ul>

            </ProfileDetails>
            </>
           )}
        </ProfileContainer>
    )
}