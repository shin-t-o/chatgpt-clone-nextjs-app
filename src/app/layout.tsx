/* eslint-disable @next/next/no-head-element */
import Provider from './Provider'
import * as style from './page.module.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>
        {/* @ts-ignore */}
        <div className={style.root}>
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  )
}
