import Sidebar from "@/components/Sidebar";
import ToggleBar from "@/components/ToggleBar";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />

            {/* Main content area */}
            <main className="ml-56 pt-20 p-6">
                {/* Your dashboard content here */}
            </main>
        </div>
    );
};

export default Dashboard;
