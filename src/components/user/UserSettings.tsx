import { toast } from "react-toastify"
import useAuth, { AuthActions } from "../../hooks/auth"
import TextInputComponent from "../input/TextInputComponent"
import axios from "axios"

const UserOptions: React.FC = () => {
    const auth: AuthActions = useAuth()

    const submitForm = async(e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        axios.put('/api/user', {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
        }).then(() => {
            auth.validate()
            toast.success('Updated!')
        }).catch((error) => {
            console.error(error)
            toast.error('Unknown error - status ' + error.status)
        })
    }


    if (auth.user.userId == -1) {
        return <h2>No data available</h2>
    }

    return (
        <div className='gray-container gap-y-5'>
            <h3>User Settings</h3>

            <form onSubmit={submitForm}>
                <div className='flex flex-row gap-x-5'>      
                    <TextInputComponent title='First Name' formName='firstName' value={auth.user.firstName}/>
                    <TextInputComponent title='Last Name' formName='lastName' value={auth.user.lastName}/>
                    <TextInputComponent title='Email' formName='email' extended value={auth.user.email}/>
                </div>

                <button className='mt-5' type='submit'>
                    Update
                </button>
            </form>
        </div>
    )
}

export default UserOptions