import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 border-r min-h-screen">Admin Sidebar</aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
