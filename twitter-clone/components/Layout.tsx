import Sidebar from "./layout/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto lg:px-30 max-w-6xl"> 
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}