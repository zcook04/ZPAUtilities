import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/header/Header';

export const metadata = {
    title: 'Zscaler Automation Application',
    description: 'Application built to help automate common tasks within Zscaler by working with the ZPA API. Login Page',
}

export default function ToolsLayout({ children }) {

    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}