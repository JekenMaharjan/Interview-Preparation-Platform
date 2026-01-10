import React from "react";

type HeaderProps = {
    icon?: any;
    header: string;
    subheader?: string;
};

const Header = ({icon, header, subheader }: HeaderProps) => {
    return (
        <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-200 p-3 rounded-xl">
                {icon}
            </div>
            <div>
                <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                    {header}
                </p>

                {subheader && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {subheader}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Header;
