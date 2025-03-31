import React, { ReactNode } from 'react'
import CardLayout from '../../layouts/CardLayout'
import InstructorCardList from '../../components/instructor/InstructorCardList'


const InstructorPanel: React.FC = (): ReactNode => {
    return (
        <CardLayout 
        title='Instructor Panel'
        ListObjects={<InstructorCardList/>}
        WindowDisplay={<></>}
        />
    )
}

export default InstructorPanel