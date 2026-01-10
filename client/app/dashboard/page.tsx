import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ToggleBar from "@/components/ToggleBar";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />

            <main className="ml-56 pt-6 p-6">
                <Header
                    header="Dashboard"
                    subheader="Track your daily learning progress"
                />
            </main>
        </div>
    );
};

export default Dashboard;
