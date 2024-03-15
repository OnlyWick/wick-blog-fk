import { Card } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

const ArticleToc = dynamic(() => import("@/stories/Article/Toc/ArticleToc"), {
    ssr: false,
});

export default function Catalog() {
    return (
        <>
            <div className="fixed">
                <ArticleToc source="#catalog" />
            </div>
            <div className="m-auto max-w-5xl pb-10">
                <h1 className="text-center mb-8 text-5xl font-bold">
                    目录
                </h1>
                <ul id="catalog" className="flex flex-col gap-8">
                    <li>
                        <h1 className="text-center mb-4 text-2xl font-bold">
                            计算机科学
                        </h1>
                        <section className="flex gap-4 text-center flex-wrap">
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    操作系统
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    数据库
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    计算机网络
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    数据结构
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                        </section>
                    </li>
                    <li>
                        <h1 className="text-center mb-4 text-2xl font-bold">
                            前端1
                        </h1>
                        <section className="flex gap-4 text-center flex-wrap">
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    HTML
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    CSS
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    JavaScript
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    Vue
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    React
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                        </section>
                    </li>
                    <li>
                        <h1 className="text-center mb-4 text-2xl font-bold">
                            前端2
                        </h1>
                        <section className="flex gap-4 text-center flex-wrap">
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    HTML
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    CSS
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    JavaScript
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    Vue
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    React
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                        </section>
                    </li>

                    <li>
                        <h1 className="text-center mb-4 text-2xl font-bold">
                            前端3                        </h1>
                        <section className="flex gap-4 text-center flex-wrap">
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    HTML
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    CSS
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    JavaScript
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    Vue
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    React
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                        </section>
                    </li>

                    <li>
                        <h1 className="text-center mb-4 text-2xl font-bold">
                            前端4
                        </h1>
                        <section className="flex gap-4 text-center flex-wrap">
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    HTML
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    CSS
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    JavaScript
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    Vue
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                            <Card className="cursor-pointer flex flex-col min-h-20 max-h-36 opacity-75 hover:opacity-100 w-[244px]">
                                <h2 className="text-xl font-semibold">
                                    React
                                </h2>
                                <div className="flex flex-col mt-4">
                                    <span className="mb-2">
                                        收录: 123
                                    </span>
                                    <span>
                                        创建日期: {dayjs(new Date()).format("YYYY MM DD")}
                                    </span>
                                </div>
                            </Card>
                        </section>
                    </li>
                </ul>
            </div >
        </>
    )
}