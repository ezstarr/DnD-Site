import Nav from './(components)/Nav'
import AuthProvider from './(components)/AuthProvider'
import './globals.css'
import {Providers} from './providers'
import ThemeChanger from './(components)/ThemeChanger'


export const metadata = {
  title: "TimeEnjoyed Server D&D Character Page",
  description: 'Made with NextJS and React',
}

export default function RootLayout({children}) {
  // console.log(children)
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <Providers>
          <body>
            <Nav />
            <ThemeChanger />
            {children}
          </body>
        </Providers>
      </AuthProvider>
    </html>
  )
}
