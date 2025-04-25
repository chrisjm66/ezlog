import { useNavigate } from "react-router-dom"
import ExperienceCard from "./ExperienceCard"

const ExperienceCardList: React.FC = () => {
    const navigate = useNavigate()

    const handleClick = (href: string) => {
        navigate(`/dashboard/experience${href}`)
    }

    return (
        <>
            <ExperienceCard title='Recent Experience' subtext='0/0 test' onClick={() => {handleClick('/')}}/>
            <ExperienceCard title='Private Pilot Progress' subtext='0/0 test' onClick={() => {handleClick('/progress/private')}}/>
        </> 
    )
}

export default ExperienceCardList