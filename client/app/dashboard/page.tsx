import DashboardPage from "@/components/DashboardPage";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ToggleBar from "@/components/ToggleBar";
import { MdOutlineDashboard } from "react-icons/md";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />

            <main className="ml-56 pt-25 p-6">
                <Header
                    icon={<MdOutlineDashboard className="w-5 h-5 text-purple-700 dark:text-gray-300" />}
                    header="Dashboard"
                    subheader="Track your daily learning progress"
                />
                <DashboardPage />
            </main>
        </div>
    );
};

export default Dashboard;
