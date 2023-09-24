import './globals.css'

export const metadata = {
  title: 'Zscaler Automation Application',
  description: 'Application built to help automate common tasks within Zscaler by working with the ZPA API. Login Page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
