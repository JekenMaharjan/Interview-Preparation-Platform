type CircularProgressProps = {
    value: number; // percentage (0–100)
};

const CircularProgress = ({ value }: CircularProgressProps) => {
    const radius = 70;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset =
        circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center">
            <svg height={radius * 2} width={radius * 2}>
                {/* Background circle */}
                <circle
                    stroke="#E5E7EB" // gray-200
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="dark:stroke-gray-700"
                />

                {/* Progress circle */}
                <circle
                    stroke="#14B8A6" // teal-500
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform={`rotate(-90 ${radius} ${radius})`}
                    className="dark:stroke-teal-500"
                />
            </svg>

            {/* Text */}
            <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {value}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Complete
                </span>
            </div>
        </div>
    );
};

export default CircularProgress;
