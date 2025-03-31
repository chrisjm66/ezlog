import React, { ReactNode } from 'react'
import CardLayout from '../../layouts/CardLayout'

const InstructorCards: React.FC = () => {
    return (
        <>e</>
    )
}

const InstructorPanel: React.FC = (): ReactNode => {
    return (
        <CardLayout 
        title='Instructor Panel'
        ListObjects={<InstructorCards/>}
        WindowDisplay={<></>}
        />
    )
}

export default InstructorPanel