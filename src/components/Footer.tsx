// src/components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-center text-teal-600 sm:justify-start">
                        <span className="text-2xl font-bold">YourStore</span>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                        Copyright © 2025. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}