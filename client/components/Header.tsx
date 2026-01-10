import React from "react";

type HeaderProps = {
    header: string;
    subheader?: string;
};

const Header = ({ header, subheader }: HeaderProps) => {
    return (
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
    );
};

export default Header;
