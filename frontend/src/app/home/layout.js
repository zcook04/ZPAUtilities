import '../globals.css';
import dynamic from 'next/dynamic';
const ConnectionBar = dynamic(() => import('../../components/connectionBar/connectionBar'), { ssr: false });



export const metadata = {
  title: 'Zscaler Automation Application',
  description: 'Application built to help automate common tasks within Zscaler by working with the ZPA API.',
}

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <ConnectionBar />
    </>
  )
}
