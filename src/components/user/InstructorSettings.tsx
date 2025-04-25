import React, { ReactNode, useState } from "react";
import CheckboxComponent from "../input/CheckboxInputComponent";
import TextInputComponent from "../input/TextInputComponent";
import axios from "axios";
import Modal from "../modal/Modal";
import useAuth, {AuthActions} from "../../hooks/auth";
import { toast } from "react-toastify";

const InstructorSettings: React.FC = (): ReactNode => {
    const auth: AuthActions = useAuth()
    const [submitting, setSubmitting] = useState(false)

    const submitForm = async(e) => {
        if (submitting) return
        setSubmitting(true)
        e.preventDefault()

        const formData = new FormData(e.target)

        axios.put('/api/user/instructor', {
            isInstructor: formData.get('isInstructor') == 'on' ? true : false,
            instructorId: formData.get('instructorId'),
            expirationDate: formData.get('expirationDate'),
        }).then(() => {
            auth.validate()
            toast.success('Updated!')
        }).catch((error) => {
            console.error(error)
            toast.error('Unknown error - status ' + error.status)
        })

        setSubmitting(false)
    }
    
    return (
        <div className="gray-container gap-y-5">
            <Modal title='Form Status' open={submitting}>
                <h3>Submitting</h3>
            </Modal>

            <h3>Instructor Settings</h3>

            <form onSubmit={submitForm}>
                <div className='flex flex-row gap-x-5'>      
                    <CheckboxComponent title='Instructor Mode' formName='isInstructor' value={auth.user.isInstructor}/>
                    <TextInputComponent title='Instructor ID' formName='instructorId' value={auth.user.instructorCid}/>
                    <TextInputComponent title='Expiration' formName='expirationDate' value={auth.user.instructorExpiryDate}/>
                </div>

                <button className='mt-5' type='submit'>
                    Save
                </button>
            </form>
            
            
        </div>
    )
}

export default InstructorSettings