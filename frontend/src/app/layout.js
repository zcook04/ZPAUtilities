import './globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export const metadata = {
  title: 'Zscaler Automation Application',
  description: 'Application built to help automate common tasks within Zscaler by working with the ZPA API. Login Page',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={poppins.className}>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
