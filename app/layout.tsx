import '@/app/ui/global.css';
 
const RootLayout = ({children}: {children: React.ReactNode}) => (
    <html lang="en">
      <title>VCRV@next</title>
      <body>{children}</body>
    </html>
);
export default RootLayout;