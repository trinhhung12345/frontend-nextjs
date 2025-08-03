// src/app/contact/page.tsx
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function ContactPage() {
    return (
        <div className="relative isolate bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                    <div className="absolute inset-y-0 -left-80 -z-10 w-full overflow-hidden bg-white blur-3xl lg:w-1/2">
                        <div
                            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Liên Hệ Với Chúng Tôi</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Chúng tôi luôn sẵn lòng lắng nghe bạn. Vui lòng điền vào biểu mẫu bên cạnh hoặc sử dụng thông tin dưới đây để kết nối.
                    </p>
                    <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                        <div className="flex gap-x-4">
                            <dt className="flex-none">
                                <span className="sr-only">Address</span>
                                <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                            </dt>
                            <dd>
                                123 Đường ABC, Phường XYZ, Quận 1
                                <br />
                                Thành phố Hồ Chí Minh, Việt Nam
                            </dd>
                        </div>
                        <div className="flex gap-x-4">
                            <dt className="flex-none">
                                <span className="sr-only">Telephone</span>
                                <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                            </dt>
                            <dd>
                                <a className="hover:text-gray-900" href="tel:+84 123 456 789">
                                    +84 123 456 789
                                </a>
                            </dd>
                        </div>
                        <div className="flex gap-x-4">
                            <dt className="flex-none">
                                <span className="sr-only">Email</span>
                                <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                            </dt>
                            <dd>
                                <a className="hover:text-gray-900" href="mailto:hello@myshop.com">
                                    hello@myshop.com
                                </a>
                            </dd>
                        </div>
                    </dl>
                </div>
                <form action="#" method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Tên
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Họ
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Số điện thoại
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="tel"
                                        name="phone-number"
                                        id="phone-number"
                                        autoComplete="tel"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Lời nhắn
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Gửi Lời Nhắn
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}