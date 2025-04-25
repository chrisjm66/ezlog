import { Outlet } from "react-router-dom"
import CardLayout from "../../layouts/CardLayout"
import ExperienceCardList from "../../components/experience/ExperinceCardList"

const RecentExperience: React.FC = () => {    
    return (
        <CardLayout
        title='Experience Report'
        buttonText='View Logbook'
        buttonHref='/dashboard/logbook'
        ListObjects={<ExperienceCardList/>}
        WindowDisplay={<Outlet/>}
        />
    )
}

export default RecentExperience