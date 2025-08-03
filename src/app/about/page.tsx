// src/app/about/page.tsx
import { BuildingStorefrontIcon, HeartIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const values = [
    {
        name: 'Chất Lượng Hàng Đầu',
        description: 'Chúng tôi cam kết mỗi sản phẩm đến tay bạn đều là phiên bản tốt nhất, được lựa chọn và kiểm tra kỹ lưỡng.',
        icon: BuildingStorefrontIcon,
    },
    {
        name: 'Tận Tâm Vì Khách Hàng',
        description: 'Sự hài lòng của bạn là ưu tiên số một. Đội ngũ của chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ.',
        icon: HeartIcon,
    },
    {
        name: 'Không Ngừng Sáng Tạo',
        description: 'Chúng tôi liên tục cập nhật xu hướng và công nghệ để mang đến những trải nghiệm mua sắm mới mẻ và tiện lợi.',
        icon: LightBulbIcon,
    },
];

const team = [
    {
        name: 'Trần Văn An',
        role: 'Nhà Sáng Lập & CEO',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300',
    },
    {
        name: 'Lê Thị Bình',
        role: 'Giám Đốc Marketing',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300',
    },
    {
        name: 'Nguyễn Minh Cường',
        role: 'Trưởng Phòng Vận Hành',
        imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300',
    },
];

export default function AboutPage() {
    return (
        <div className="bg-white">
            <main className="isolate">
                {/* Hero section */}
                <div className="relative pt-14">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className="py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Về Chúng Tôi</h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    MyShop được xây dựng từ niềm đam mê mang đến những sản phẩm chất lượng và trải nghiệm mua sắm trực tuyến tuyệt vời. Chúng tôi tin rằng mỗi món đồ bạn chọn là một phần câu chuyện của riêng bạn.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Câu Chuyện Thương Hiệu</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-xl leading-8 text-gray-600">
                                    Khởi đầu từ một ý tưởng nhỏ, MyShop đã phát triển thành một điểm đến mua sắm tin cậy. Hành trình của chúng tôi được thúc đẩy bởi mong muốn kết nối khách hàng với những sản phẩm độc đáo, chất lượng cao từ khắp nơi trên thế giới.
                                </p>
                                <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                                    <p>
                                        Chúng tôi hiểu rằng mua sắm không chỉ là một giao dịch, mà còn là một trải nghiệm. Vì vậy, chúng tôi không ngừng nỗ lực cải tiến từ giao diện website, quy trình đặt hàng, đến dịch vụ chăm sóc khách hàng để đảm bảo bạn luôn cảm thấy hài lòng và an tâm.
                                    </p>
                                    <p className="mt-10">
                                        Mỗi thành viên trong đội ngũ MyShop đều chia sẻ chung một tầm nhìn: xây dựng một cộng đồng nơi mọi người có thể khám phá, chia sẻ và thể hiện phong cách cá nhân qua những sản phẩm mà chúng tôi cung cấp.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:flex lg:flex-auto lg:justify-center">
                                <Image
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"
                                    alt="Our team working"
                                    width={800}
                                    height={600}
                                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Giá Trị Cốt Lõi</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Những nguyên tắc này là kim chỉ nam cho mọi quyết định và hành động của chúng tôi tại MyShop.
                        </p>
                    </div>
                    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {values.map((value) => (
                            <div key={value.name}>
                                <dt className="font-semibold text-gray-900 flex items-center gap-x-3">
                                    <value.icon className="h-7 w-7 text-blue-600" aria-hidden="true" />
                                    {value.name}
                                </dt>
                                <dd className="mt-2 text-gray-600">{value.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Team section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Gặp Gỡ Đội Ngũ</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Chúng tôi là một tập thể đa dạng gồm những con người đam mê, sáng tạo và luôn đặt khách hàng làm trung tâm.
                        </p>
                    </div>
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >
                        {team.map((person) => (
                            <li key={person.name}>
                                <Image className="aspect-[3/2] w-full rounded-2xl object-cover" src={person.imageUrl} alt="" width={300} height={200} />
                                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                                <p className="text-base leading-7 text-gray-600">{person.role}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA section */}
                <div className="relative -z-10 mt-32 px-6 py-32 sm:mt-48 lg:px-8">
                    <div
                        className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-25"
                            style={{
                                clipPath:
                                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                            }}
                        />
                    </div>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Sẵn sàng khám phá?
                            <br />
                            Bắt đầu mua sắm ngay hôm nay.
                        </h2>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/products"
                                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Xem Sản Phẩm
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}