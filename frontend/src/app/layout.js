import './globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Roboto_Serif } from 'next/font/google'

const roboto = Roboto_Serif({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: 'Zscaler Automation Application',
  description: 'Application built to help automate common tasks within Zscaler by working with the ZPA API. Login Page',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={roboto.className}>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
