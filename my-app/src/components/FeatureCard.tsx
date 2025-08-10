import { ReactNode } from "react";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-900">
      {/* Background decorative gradient */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-50/80 opacity-0 transition-all duration-500 group-hover:opacity-100 dark:bg-blue-500/5"></div>
      
      {/* Icon with enhanced animations */}
      <div className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-white text-blue-600 shadow-sm ring-1 ring-inset ring-blue-100 transition-all duration-300 group-hover:bg-blue-100 group-hover:text-blue-700 group-hover:shadow-md group-hover:ring-blue-200 dark:from-gray-800 dark:to-gray-900 dark:text-blue-400 dark:ring-blue-500/20 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-300 dark:group-hover:ring-blue-500/30">
        <div className="transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
      
      {/* Text content */}
      <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
      
      {/* Bottom indicator line */}
      <div className="mt-5 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
    </div>
  );
}
