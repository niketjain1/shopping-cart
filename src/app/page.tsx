export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200 ">
          <main className="flex-grow container mx-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
