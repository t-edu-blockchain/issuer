import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from 'antd';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout style={{ minHeight: '100vh' }}>
          {children}
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}


