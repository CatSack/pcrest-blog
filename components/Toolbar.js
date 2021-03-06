import {useSession, signIn, signOut} from 'next-auth/react'
import styles from './Toolbar.module.scss'
import permissions from '../user_permissions.json'

export default function Toolbar(props) {
    const {data: session} = useSession()
    var sign = null
    if(session) {
        sign = (
            <a key={1} onClick={() => signOut()}>
                SIGN OUT
            </a>
        )
    } else {
        sign = (
            <a key={1} onClick={() => signIn('google')}>
                SIGN IN
            </a>
        )
    }
    var admin_portal = null
    if(session && permissions.admins.includes(session.user.email)) {
        admin_portal = <a key={3} href='/admin_portal'>ADMIN PORTAL</a>
    }
    return (
        <ul className={styles.topWrapper}>
            <a key={0} href='/journalism_staff'>
                JOURNALISM STAFF
            </a>
            {admin_portal}
            {sign}
        </ul>
    )
}